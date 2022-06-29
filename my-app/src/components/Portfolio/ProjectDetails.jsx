import React, { useEffect } from 'react'
import project_1 from '../../images/project.png'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singleProject } from '../../Redux/Projects/projectsSlice'

function ProjectDetails()
{
    const { id } = useParams()
    const dispatch = useDispatch()
    const { projectDetails } = useSelector(state => state.projects)
    const { title, image, desc, details } = projectDetails
    useEffect(() =>
    {
        dispatch(singleProject(id))
    }, [])

    return (
        <div className='project__details'>
            <div className="page_title">
                تفاصيل المشروع
            </div>
            <div className="project__details__container container">
                <div className="project__details__container--img">
                    <img src={image && image} alt="" />
                </div>
                <div className="project__details__container--info">
                    <div className="project__details__container--info__title">
                        {title}
                    </div>
                    <div className="project__details__container--info__description">
                        {desc}
                    </div>
                    {details?.map(tool => (
                        <div className="project__details__container--info__tools">
                            <div className="project__details__container--info__tools__title"> {tool.head} </div>
                            <ul className='project__details__container--info__tools__list'>
                                {tool?.items?.map(item => <li> {item} </li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails