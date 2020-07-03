const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const generator = require("generate-password");
const cors = require("cors")({ origin: true });
admin.initializeApp();

/*
 * all of the onCall functions should handle errors with https://firebase.google.com/docs/functions/callable#handle_errors
 * instead of just console.log/console.error, that way the app can get the error too
 */

exports.contactForm = functions.https.onCall(async (data, context) => {
  sgMail.setApiKey(functions.config().sendgrid.key);
  const msgOne = {
    to: "upe@bu.edu",
    from: "upe@bu.edu",
    templateId: functions.config().sendgrid.template.contact.one,
    dynamic_template_data: {
      name: data.name,
      senderEmail: data.senderEmail,
      subject: data.subject,
      text: data.text,
    },
  };

  const msgTwo = {
    to: data.senderEmail,
    from: "upe@bu.edu",
    templateId: functions.config().sendgrid.template.contact.two,
    dynamic_template_data: {
      name: data.name,
      subject: data.subject,
    },
  };

  const sgPromises = [sgMail.send(msgOne), sgMail.send(msgTwo)];
  return Promise.all(sgPromises)
    .then(() => {
      return { success: true, msg: "Sent messages!" };
    })
    .catch(err => {
      console.error(err);
      throw new functions.https.HttpsError('internal', 'Failed to send emails through SendGrid!');
    });
});

exports.newUser = functions.https.onCall(async (data, context) => {
  sgMail.setApiKey(functions.config().sendgrid.key);
  
  if (
    !context.auth &&
    context.auth.currentUser.isEmailVerified()
  ) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Must be logged in and verified!"
    );
  }

  var pass = generator.generate({
    length: 16,
    symbols: true,
    lowercase: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    strict: true,
    numbers: true,
  });
  
  await admin
    .auth()
    .createUser({
      email: data.email,
      password: pass,
	  emailVerified: false,
    })
    .catch(err => console.error(err));

  const actionCodeSettings = {
    url: "http://upe.bu.edu/login",
  };

  admin
    .auth()
    .generatePasswordResetLink(data.email, actionCodeSettings)
    .then(async link => {
      const msg = {
        to: data.email,
        from: "upe@bu.edu",
        templateId: functions.config().sendgrid.template.account.creation,
        dynamic_template_data: {
          name: data.name,
          senderEmail: data.email,
          link: link,
        },
      };

      return sgMail.send(msg)
	    .then(() => {
		  return { success: true, msg: "Sent messages!" };
		})
		.catch(err => {
		  console.error(err);
          throw new functions.https.HttpsError('internal', 'Failed to send emails through SendGrid!');
		});
    })
    .catch(err => {
      console.log(err);
	  throw new functions.https.HttpsError('internal', 'Failed to create user');
    });
});

exports.resetPassword = functions.https.onCall(async (data, context) => {
  sgMail.setApiKey(functions.config().sendgrid.key);

  const actionCodeSettings = {
    url: "http://upe.bu.edu/login",
  };

  admin
    .auth()
    .generatePasswordResetLink(data.email, actionCodeSettings)
    .then(async link => {
      const msg = {
        to: data.email,
        from: "upe@bu.edu",
        templateId: functions.config().sendgrid.template.account.passwordreset,
        dynamic_template_data: {
          senderEmail: data.email,
          link: link,
        },
      };

      return sgMail.send(msg)
	    .then(() => {
		  return { success: true, msg: "Sent messages!" };
		})
		.catch(err => {
		  console.error(err);
          throw new functions.https.HttpsError('internal', 'Failed to send emails through SendGrid!');
		});
    })
    .catch(err => {
      console.log(err);
	  throw new functions.https.HttpsError('internal', 'Failed to reset password');
    });
});

exports.verifyEmail = functions.https.onRequest(async (req, res) => {
  sgMail.setApiKey(functions.config().sendgrid.key);

  if (!req.query.context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Must be logged in!"
    );
  }

  const actionCodeSettings = {
    url: "http://upe.bu.edu/login",
  };

  admin
    .auth()
    .generateEmailVerificationLink(req.query.email, actionCodeSettings)
    .then(link => {
      const msg = {
        to: req.query.email,
        from: "upe@bu.edu",
        templateId: functions.config().sendgrid.template.account.emailverify,
        dynamic_template_data: {
          senderEmail: req.query.email,
          link: link,
        },
      };

      return sgMail.send(msg);
    })
    .catch(error => {
      console.log(error);
    });

  res.json({ result: `Email sent!` });
});

exports.deleteUser = functions.https.onRequest(async (req, res) => {
  sgMail.setApiKey(functions.config().sendgrid.key);

  if (
    !req.query.context.auth &&
    req.query.context.auth.currentUser.isEmailVerified()
  ) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Must be logged in and verified!"
    );
  }

  admin
    .firestore()
    .collection("users")
    .doc(req.query.docId)
    .delete();

  const userRecord = await admin
    .auth()
    .getUserByEmail(req.query.email)
    .catch(error => {
      console.log(error);
    });

  admin
    .auth()
    .deleteUser(userRecord.uid)
    .then(() => {
      return console.log("User Deleted");
    })
    .catch(error => {
      console.log(error);
    });

  const msg = {
    to: req.query.email,
    from: "upe@bu.edu",
    templateId: functions.config().sendgrid.template.account.deletion,
    dynamic_template_data: {
      senderEmail: req.query.email,
    },
  };

  const r = await sgMail.send(msg);

  res.json({ result: `User Deleted!` });
});
