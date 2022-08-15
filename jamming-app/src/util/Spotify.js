

let token;
const clientID = '697f7a38102a4e5bbd757c003b1ffb0e';
const redirectURI = "https://willowy-beignet-5e4459.netlify.app/";


export const Spotify = {
    getAccessToken(){
      
        if(token){
            console.log(token); 
            return token;
            
        }

        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenMatch && expiresMatch){
            token = tokenMatch[1];
            const expiresIn = Number(expiresMatch[1]);
            window.setTimeout(() => token = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        }else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessURL;
        }
    },

    savePlaylist(name, uris){
        if(!name || !uris.length){
            console.log(2);
            return;
        } 
        
        console.log(3);
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`}
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            userId = jsonResponse.id
            return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers, 
                method: 'POST',
                body: JSON.stringify({name:name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers:headers, 
                    method: 'POST', 
                    body: JSON.stringify({uris: uris})
                })
            })
        })

    },

    search(term){
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&market=GB`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                
                console.log('empty');
                return [];
            }
            console.log(jsonResponse.tracks);
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track.preview_url
                
            }))
        })
    }
}


