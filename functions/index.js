const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const sgMail = require('@sendgrid/mail');

const API_KEY = functions.config().sendgrid.key;

const CONTACT_ONE = functions.config().sendgrid.template.contact.one;
const CONTACT_TWO = functions.config().sendgrid.template.contact.two;

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