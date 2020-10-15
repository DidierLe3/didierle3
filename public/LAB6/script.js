function range(int){

}

function sortFunction(a, b, key){

}

document.body.addEventListener('submit', async(evt)) =>
    evt.prevenDefault(); /*this stops whatever the browser wnated to do itself*/
    const form = $(evt.target).serializeArray(); /*use jquery to serialize the form*/

    fetch('/api', {
        method: 'POST'
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON,stringify(form)
    })

        .then((fromServer) => fromServer.json())
        .then((fromServer) => {
            console.log('fromServer', fromServer);
        })
        .catch