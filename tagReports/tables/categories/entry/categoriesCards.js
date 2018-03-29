import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './categoriesCards.html';

Template.categoriesCards.helpers({
	getCategoryCreated() {
		return true;
	},

	getCategoryClosed() {
		return true;
	},

	getCategoryExpired() {
		return true;
	},

	getCategoryAssigned() {
		return true;
	},

});