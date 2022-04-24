import axios from "axios"

const webpackDevServerReady = async (url: string): Promise<void> => {
    let webpackServerReady: boolean = false;
    
    while(!webpackDevServerReady){
        await setTimeout(async ()=>{
            axios.get(url)
            .then(response => {
                if(response.status == 200) webpackServerReady = true;
                console.log("Server ready");
            })
            .catch(err =>{console.log("Not ready");})        
        }, 1000);
    }

    return;
}

export default webpackDevServerReady;