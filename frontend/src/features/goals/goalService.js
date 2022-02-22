import axios from 'axios'

const API_URL = '/api/goals/'

const createGoal = async (goalInput) => {

    const response = await axios.post(API_URL, goalInput)



    return response 
}

export default createGoal 