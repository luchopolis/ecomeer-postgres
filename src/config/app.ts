require('dotenv').config()
const port = (process.env.ENV === 'DEV') ? 3000 : process.env.PORT

export default {
    port, 
}