import React from 'react'

const statusOfTreatmentInfo = () => (
	<div>
		<p>This graph shows the percentage of those users entering the treatment phase of Breaking Free who have gone on to achieve at least one of the following:</p>
		<ol>
			<li>They were using their main problem substance at initial assessment (i.e. they were not abstinent) and have subsequently achieved their identified treatment goal for that substance</li>
			<li>They have shown measurable clinical improvement on at least 3 domains of biopsychosocial functioning in the Lifestyle Balance Model (note: the mean number of red areas at initial assessment = 3.1)</li>
			<li>They have moved from a severe to very severe level of substance dependence to a low to moderate level of substance dependence</li>
			<li>They have completed the equivalent of 6 keyworking sessions on Breaking Free </li>
			<li>They have completed the equivalent elements of Breaking Free that are required to apply for a qualification in Life and Living Skills (Entry Level) from OCR at approved centres </li>
		</ol>
	</div>
)

const EBIInfo = () => (<p>This graph shows the percentage of those users addressing alcohol problems with Breaking Free who have completed an Extended Brief Intervention. This means they have worked through the clinical assessment and received visual feedback showing their current level of drinking in the context of the UK Government guidelines.</p>)

const changeInUseInfo = () => (<div>
	This graph shows the average percentage reduction in consumption by Breaking Free users for each substance or class of substances on which it has been possible to measure this in relation to their main problem substance.<br/>
	Please note:<br/>
	Amphetamines includes amphetamines and methamphetamine.<br/>
	Barbiturates includes mephobarbital, phenobarbital, pholcodine and quaaludes.<br/>
	Club drugs includes ecstasy, GBL, GHB and ketamine.<br/>
	New psychoactive substances includes etizolam, khat, MDPV, mephedrone, methoxetamine, MSJ, nitrous oxide and synthetic cannabis.<br/>
	Prescribed medications includes amitriptyline, codeine, diazepam, dihydrocodeine, gabapentin, lorazepam, nitrazepam, pregabalin, temazepam, tramadol and zopiclone.<br/>
	Substitute medications includes buprenorphine, methadone and suboxone.<br/>
</div>)

const abstinenceInfo = () => (<div>
	This graph shows the percentage of those Breaking Free users who were abstinent on their main problem substance at initial assessment who were also abstinent on that substance at their most recent progress check.
</div>)

const offWorkInfo = () => (<div>
	This graph shows the percentage of treatment episodes the Breaking Free users have undertaken outside of normal service operating hours (i.e. outside of 09.00 to 17.00 on Monday to Friday, not accounting for public holidays).
</div>)

const recoveryProgression = () => (<div>
	This graph shows the average percentage improvement of the Breaking Free users on the six
	domains of biopsychosocial functioning that are targeted by the programme: difficult situations,
	negative thoughts, emotional impact, physical sensations, unhelpful behaviours and lifestyle. These
	domains are evidenced by research to be implicated in both substance use and recovery from
	substance use.
</div>)

const daysOfTheWeekInfo = () => <div>This graph shows the percentage of treatment episodes the Breaking Free users have undertaken on	each day of the week.</div>

export default {
	statusOfTreatmentInfo,
	EBIInfo,
	changeInUseInfo,
	abstinenceInfo,
	offWorkInfo,
	recoveryProgression,
	daysOfTheWeekInfo
}