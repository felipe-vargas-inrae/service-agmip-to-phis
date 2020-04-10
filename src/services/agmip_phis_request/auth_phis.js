const  constants = require('../../utils/constans');
const axios = require('axios')

// HELPERS---------------------
async function getTokenAxios(){
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    const url= constants.URL_LOGIN          
    try {

      const data = {
          "grant_type": "password",
          "username": "admin@opensilex.org",
          "password": "21232f297a57a5a743894a0e4a801fc3",
          "client_id": "string"
      }
      const response = await axios.post(url, data);
      const token=response.data["access_token"]

      return token
    } catch (error) {
      
      console.log( error.response);
    }
    return null
}

class AuthPhis {

    constructor(){
        // this.username=username
        // this.password=password
    }

    async getToken(){
        if (this.token){
          return this.token
        }

        else {
          console.log("else option")
          const token= await getTokenAxios()
          this.token= token
          return this.token
        }
    }

    getHeader(){
      return {
          headers: {'Authorization': "Bearer " + this.token}
      };
    }
}

module.exports= AuthPhis