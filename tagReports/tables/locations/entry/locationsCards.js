import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './locationsCards.html';

Template.locationsCards.helpers({
	getLocationCreated() {
		return true;
	},

	getLocationClosed() {
		return true;
	},

	getLocationExpired() {
		return true;
	},

	getLocationAssigned() {
		return true;
	},

});