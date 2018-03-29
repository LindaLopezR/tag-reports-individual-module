import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './entry/categoriesCards.js';
import './tagReportCategories.html';

Template.tagReportCategories.helpers({
	showReportCategory() {
		return false;
	},
	getCategoryCards() {
		return;
	}
});