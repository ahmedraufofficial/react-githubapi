const express = require('express');
const router = express.Router();
const https = require('https');
const { Octokit } = require("@octokit/core");
const Redis = require('ioredis');
const client = Redis.createClient();


/**
 * @swagger
 * /api/search:
 *  get:
 *      tags: [Get Users/Repositories]
 *      description: Get an array of all the users or repos that are returned from the api as objects
 *      parameters:
 *             - in: query
 *               name: search
 *               schema:
 *                   type: text
 *               description: Search for any matching in GitHub 
 *             - in: query
 *               name: purpose
 *               enum: ["user","repository"]
 *               schema:
 *                   type: string
 *                   enum: [user, repository]
 *               description: Select 'user' or 'repository' from dropdown menu
 *      responses:
 *          '200':
 *              description: An array of users/ repositories objects
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @swagger
 * /api/clear-cache:
 *  get:
 *      tags: [Clear Cache]
 *      description: Clear all keys from Redis Server
 *      responses:
 *          '204':
 *              description: Succesfully Cleared
 */

router.get('/search',async function(req,res){
    var q = req.query.search;
    var p = req.query.purpose;
    if (p==""){p="user";}
    const reply = await client.get(q+'@'+p);
    if (reply){
        res.send(JSON.parse(reply));
        return
    }

    const octokit = new Octokit({ auth: `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` });
    var obj = []
    if (p == "user"){
        const result = await octokit.request('GET /search/users', {
            q: q
          })
        var all_users = result.data.items;
        for (let i = 0; i < all_users.length; i++) {
            var users = {
            id:all_users[i].id,
            user_url:all_users[i].html_url,
            username: all_users[i].login,
            user_img:all_users[i].avatar_url,
            score:all_users[i].score,
            site_admin:all_users[i].score
            }   
            obj.push(users);
        }
    }
    else if (p == "repository")
    {
        const result = await octokit.request('GET /search/repositories', {
            q: q
        })
        
        var all_repos = result.data.items;

        for (let i = 0; i < all_repos.length; i++) {
            
            if (all_repos[i].language == null){
                all_repos[i].language = "-"
            }
            
            var repos = {
            id:all_repos[i].id,
            repo_url:all_repos[i].html_url,
            repo: all_repos[i].name,
            desc:all_repos[i].description,
            star:all_repos[i].stargazers_count,
            language:all_repos[i].language,
            created:all_repos[i].created_at.replace("T"," - ").replace("Z",""),
            watch:all_repos[i].watchers_count,
            owner:all_repos[i].owner.login,
            owner_img:all_repos[i].owner.avatar_url,
            owner_url:all_repos[i].owner.html_url
            }   
            obj.push(repos);
        }
    }
    client.set(q+'@'+p,JSON.stringify(obj),'ex', 100)
    console.log('Added -> Cache ', q+'@'+p)
    res.send(obj)
})

router.get("/clear-cache", async function(req,res){
    client.flushall( function (err, succeeded) {
        console.log(succeeded)
        res.status(204).send();
    });
})



module.exports = router;