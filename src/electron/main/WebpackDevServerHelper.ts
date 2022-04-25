import axios from "axios"

const webpackDevServerReady = async (url: string): Promise<void> => {

        let webpackServerReady: boolean = false;

        return new Promise<void>(async resolve => {
            while(!webpackDevServerReady){
                try{
                    const res = await axios.get(url);
                    if(res.status == 200){
                        webpackServerReady = true;
                    }
                }
                catch {
                    console.log("Dev server not yet ready")
                }

                await new Promise<void>(resolve => { setTimeout(resolve, 500) });
            }
            await new Promise<void>(resolve => { setTimeout(resolve, 500) });
            resolve();
        }) 
}

export default webpackDevServerReady;