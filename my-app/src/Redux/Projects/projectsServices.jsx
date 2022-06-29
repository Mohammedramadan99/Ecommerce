import axios from 'axios'

const API_URL = '/api/v1/'

const allProjects = async () =>
{
    const { data } = await axios.get(API_URL + "projects")
    console.log(data)
    return data
}
const getProjectDetails = async (id) =>
{
    const { data } = await axios.get(API_URL + `project/${id}`)
    console.log(data)
    return data
}


const projectsService = {
    allProjects,
    getProjectDetails
}


export default projectsService