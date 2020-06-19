const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const sgMail = require('@sendgrid/mail');
const generator = require('generate-password');

const API_KEY = functions.config().sendgrid.key;

const CONTACT_ONE = functions.config().sendgrid.template.contact.one;
const CONTACT_TWO = functions.config().sendgrid.template.contact.two;

const ACCOUNT_CREATE = functions.config().sendgrid.template.account.creation;
const PASSWORD_RESET = functions.config().sendgrid.template.account.passwordreset;
const EMAIL_VERIFY = functions.config().sendgrid.template.account.emailverify;
const ACCOUNT_DELETE = functions.config().sendgrid.template.account.deletion;

exports.contactForm = functions.https.onCall(async (data, context) => {
	sgMail.setApiKey(API_KEY);

    const msgOne = {
        to: 'upe@bu.edu',
        from: 'upe@bu.edu',
        templateId: CONTACT_ONE,
        dynamic_template_data: {
			name: data.name,
			senderEmail: data.senderEmail,
            subject: data.subject,
            text: data.text,
        },
    };
	const msgTwo = {
        to: data.senderEmail,
        from: 'upe@bu.edu',
        templateId: CONTACT_TWO,
        dynamic_template_data: {
			name: data.name,
            subject: data.subject,
        },
    };
	
    sgMail.send(msgOne);
	sgMail.send(msgTwo);
	
	return;
});

exports.newUser = functions.https.onCall(async (data, context) => {
	sgMail.setApiKey(API_KEY);
	
	if (!context.auth && context.auth.currentUser.isEmailVerified()) {
        throw new functions.https.HttpsError('failed-precondition', 'Must be logged in and verified!');
    }
	
	var pass = generator.generate({
      length: 16,
	  symbols: true,
	  lowercase: true,
	  uppercase: true,
	  excludeSimilarCharacters: true,
	  strict: true,
      numbers: true
    });

	admin.auth().createUser({
		email: data.email,
		password: pass
	})
	
	const actionCodeSettings = {
		url:'/login',
	}
	
	admin.auth().generatePasswordResetLink(data.email, actionCodeSettings).then(link => {
	  const msg = {
		to: data.email,
		from: 'upe@bu.edu',
		templateId: ACCOUNT_CREATE,
		dynamic_template_data: {
		  name: data.name,
		  senderEmail: data.email,
		  link: link,
		},
	  };
	  
	  sgMail.send(msg);
	}).catch(error => {
		console.log(error);
	})
	
	return;
});

exports.resetPassword = functions.https.onCall(async (data, context) => {
	sgMail.setApiKey(API_KEY);
	
	const actionCodeSettings = {
		url:'/login',
	}
	
	admin.auth().generatePasswordResetLink(data.email, actionCodeSettings).then(link => {
	  const msg = {
		to: data.email,
		from: 'upe@bu.edu',
		templateId: PASSWORD_RESET,
		dynamic_template_data: {
		  senderEmail: data.email,
		  link: link,
		},
	  };
	  
	  sgMail.send(msg);
	}).catch(error => {
		console.log(error);
	})
	
	return;
});

exports.verifyEmail = functions.https.onCall(async (data, context) => {
	sgMail.setApiKey(API_KEY);
	
	if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'Must be logged in!');
    }
	
	const actionCodeSettings = {
		url:'/panel',
	}
	
	admin.auth().generateEmailVerificationLink(data.email, actionCodeSettings).then(link => {
	  const msg = {
		to: data.email,
		from: 'upe@bu.edu',
		templateId: EMAIL_VERIFY,
		dynamic_template_data: {
		  senderEmail: data.email,
		  link: link,
		},
	  };
	  
	  sgMail.send(msg);
	}).catch(error => {
		console.log(error);
	})
	
	return;
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
	sgMail.setApiKey(API_KEY);
	
	if (!context.auth && context.auth.currentUser.isEmailVerified()) {
        throw new functions.https.HttpsError('failed-precondition', 'Must be logged in and verified!');
    }
	
	admin.firestore().collection('users').doc(data.docId).delete();
	
	
	admin.auth().getUserByEmail(data.email).then(userRecord => {
		admin.auth().deleteUser(userRecord.uid).then(() => {
			console.log("User Deleted");
		}).catch(error => {
			console.log(error);
		})
	}).catch(error => {
		console.log(error);
	})
	
	const msg = {
		to: data.email,
		from: 'upe@bu.edu',
		templateId: ACCOUNT_DELETE,
		dynamic_template_data: {
		  senderEmail: data.email,
		},
	}
	
	sgMail.send(msg);
	
	return;
});