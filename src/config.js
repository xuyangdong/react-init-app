import _ from 'lodash'
const isProduction = process.env.NODE_ENV === "production"
const baseURL = isProduction
    ? 'http://www.warmtale.com'
    : 'http://www.warmtale.com'


const config = _.extend({
    // common config
    debug: true
},{
	api: {
		works:{
            query:(id) => `${baseURL}/user/getShareWorksById?id=${id}`
        },
        logo:{
            query:(userId,badgeId) => `${baseURL}/user/shareBadge?userId=${userId}&badgeId=${badgeId}`
        },
        story:{
            query:userStoryId => `${baseURL}/user/originalStory/shareUserStory?userStoryId=${userStoryId}`
        },
        plan:{
            query:(workId,userId) => `${baseURL}/user/shareWorksForReadPlan?workId=${workId}&userId=${userId}`
        },
        workTag:{
            query:(tagId) => `${baseURL}/user/workTag/showWorkListInWorkTag?tagId=${tagId}`
        }
	}
})

export default config
