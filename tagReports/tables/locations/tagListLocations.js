import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './entry/locationsCards.js';
import './tagListLocations.html';

Template.tagListLocations.helpers({
	showReportLocation() {
		return false;
	},
	getLocationCards() {
		return;
	}
});