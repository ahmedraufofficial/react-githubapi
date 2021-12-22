import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RepoCard from './Card/RepoCard';
import UserCard from './Card/UserCard';
import './Card/Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { searchPersist } from '../actions/search';
import { purposePersist } from '../actions/purpose';
import { bodyPersist } from '../actions/body';
import _ from 'lodash';



export default function DataFetching() {

    const searchData = useSelector(state => state.search);
    const purposeData = useSelector(state => state.purpose);
    const bodyData = useSelector(state => state.body);
    const dispatch = useDispatch();
    const [search_, setSearch] = useState(searchData);
    const [purpose_, setPurpose] = useState(purposeData);

    useEffect(() => {
        if (searchData === ""){
            document.getElementById("header").style.marginTop = "40vh";
        }
        else { document.getElementById("header").style.marginTop = "3vh"; }
      });

    function getFiltereddata(s,p){
        dispatch(searchPersist(s));
        dispatch(purposePersist(p));
        if (searchData.length < 3) {
            dispatch(bodyPersist(JSON.stringify([])))
        }
        if (searchData.length >= 3) {
            document.getElementById("loading").style.display = "block";
        axios.get('http://localhost:5000/api/search',{
                params :{
                    search: searchData,
                    purpose: purposeData
                }
            }).then((res) => {dispatch(bodyPersist(JSON.stringify(res.data)));
                document.getElementById("loading").style.display = "none";})
            .then((err) => {console.log(err);
                document.getElementById("loading").style.display = "none"})
        }
        return
    }
    
    getFiltereddata = _.debounce(getFiltereddata, 500)

    getFiltereddata(search_, purpose_);
  
    

    function clearcache(){
        axios.get ('http://localhost:5000/api/clear-cache')
        .then(res => {
            console.log(res);
            alert("Redis flushed!")
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>


            <div className="header" id="header">
            <img src="github.png" alt="Github"/>
            <div>
            <h4>Github Searcher</h4>
            <p>Search users or repositories below</p>
            </div>
            </div>

            <form>
                <input onChange={(e) => setSearch(e.target.value)} id="search" value={search_} placeholder='Start typing to search' type='text'/>
                <select onChange={(e) => setPurpose(e.target.value)} id="purpose" value={purpose_}>
                <option value="user" >User</option>
                <option value="repository">Repository</option>
                </select>                
            </form>
            <button onClick={clearcache}>Clear Cache</button>
            <div className='Cards'>

            {   
                JSON.parse(bodyData).map( 
                    (obj) => (purposeData === "repository") ? (<RepoCard key = {obj.id} repo_url={obj.repo_url} repo={obj.repo} desc={obj.desc} star={obj.star} language={obj.language} created={obj.created} watch={obj.watch} owner={obj.owner} owner_img={obj.owner_img} owner_url={obj.owner_url} />) 
                    : (<UserCard key = {obj.id} id={obj.id} user_url={obj.user_url} username={obj.username} user_img={obj.user_img} score={obj.score} site_admin={obj.site_admin} />)
                    )
            }

            <div id="loading"></div>
            
            </div>
            

        </div>
    )
}
