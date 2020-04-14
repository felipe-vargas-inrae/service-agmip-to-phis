import constants from '../../utils/constans'
import axios from 'axios'

// HELPERS---------------------
async function getTokenAxios():Promise<string>{
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    const url= constants.URL_LOGIN
    try {

      const data = {
          "grant_type": "password",
          "username": "admin@opensilex.org",
          "password": "21232f297a57a5a743894a0e4a801fc3",
          "client_id": "string"
      }
      const response = await axios.post(url, data)

      const keyAccess = 'access_token'
      const token=response.data[keyAccess]

      return token
    } catch (error) {
      console.log( error.response)
    }
    return null
}

class AuthPhis {

    private token:string
    constructor(){
        // this.username=username
        // this.password=password
    }

    async getToken():Promise<string>{
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

    getHeader():object{
      return {
          headers: {'Authorization': "Bearer " + this.token}
      }
    }
}

export default AuthPhis