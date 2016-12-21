import {addOne} from '../utils'
import treatmentPathways from './treatmentPathways'
import focusOfTreatment from './focusOfTreatment'
import demographicProfile from './demographicProfile'
import activationOfAccessCards from './activationOfAccessCards'
import treatmentRetention from './treatmentRetention'
import treatmentCompletion from './treatmentCompletion'
import treatmentImpact from './treatmentImpact'
import treatmentAccess from './treatmentAccess'

export default {
	totalActivationsOfCards({chartData}) {
		chartData.totalActivationCodes = addOne(chartData.totalActivationCodes)
	},
	v3: {
		activationOfAccessCards(data) {
			activationOfAccessCards.v3(data)
		},
		treatmentPathway(data) {
			treatmentPathways.v3(data)
		},
		focusOfTreatment(data) {
			focusOfTreatment.v3(data)
		},
		demographicProfile(data) {
			demographicProfile.v3(data)
		},
		treatmentRetention(data) {
			treatmentRetention.v3(data)
		},
		treatmentCompletion(data) {
			treatmentCompletion.v3(data)
		},
		treatmentImpact(data) {
			treatmentImpact.v3(data)
		},
		treatmentAccess(data) {
			treatmentAccess.v3(data)
		}		
	},
	v4: {
		activationOfAccessCards(data) {
			activationOfAccessCards.v4(data)
		},
		treatmentPathway(data) {
			treatmentPathways.v4(data)
		},
		focusOfTreatment(data) {
			focusOfTreatment.v4(data)
		},
		demographicProfile(data) {
			demographicProfile.v4(data)
		},
		treatmentRetention(data) {
			treatmentRetention.v4(data)
		},
		treatmentCompletion(data) {
			treatmentCompletion.v4(data)
		},
		treatmentImpact(data) {
			treatmentImpact.v4(data)
		},
		treatmentAccess(data) {
			treatmentAccess.v4(data)
		}
	}
}