import React from 'react'
import './Card.css'

export default function RepoCard({ repo_url, repo, desc, star, watch, language, created, owner, owner_img, owner_url }) {
    return (

        <div className='Card'>
            <div className='card_inner'>
            <img src={owner_img} alt="No Profile Img" className='image'/>

            <h4 className='repo'>{repo}</h4>

            <h4 className='real_name'>{owner}</h4>
            
            <h4 className='real_name'>{created}</h4>
            
            <p className='desc'>{desc}</p>

            <div className='details_row'>
                <div className='details'> 
                    <p className='stat_text'>{star}</p><p className='stat'>Star</p>
                </div>
                <div className='details'>
                    <p className='stat_text'>{watch}</p><p className='stat'>Watcher</p>
                </div>
                <div className='details'>
                    <p className='stat_text'>{language}</p><p className='stat'>Language</p>
                </div>
            </div>
            <a href={repo_url}>Visit Repository</a> 
            
            </div>
        </div>
    )
}

