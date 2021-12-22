import React from 'react'
import './Card.css'

export default function UserCard({ id,user_url,username,score,site_admin, user_img }) {
    return (

        <div className='Card'>
            <div className='card_inner'>
            <img src={user_img} className='image'/>

            <h4 className='repo'>{username}</h4>
            <h4 className='real_name'>ID: {id}</h4>

            <div className='details_row'>
                <div className='details'> 
                    <p className='stat_text'>{score}</p><p className='stat'>Score</p>
                </div>
                <div className='details'>
                    <p className='stat_text'>{site_admin}</p><p className='stat'>Site Admin</p>
                </div>
            </div>
            <a href={user_url}>Visit Profile</a> 
            
            </div>
        </div>
    )
}
