
//import { uuidv4 } from 'uuid';
const dbconfig = {
  host: "nmegx0z0tj4ho1.cxjpzndq5h93.us-west-1.rds.amazonaws.com",//process.env.MYSQL_HOST,
  database: process.env.DB_NAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
}


const client = require('serverless-mysql')({
  config:dbconfig
})


const resetdb = async () => {
console.log("Resetting DB config: ",dbconfig)

  await client.query(`
  CREATE TABLE IF NOT EXISTS shirts
  (
      id MEDIUMINT UNSIGNED not null AUTO_INCREMENT, 
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      design varchar(100) not null,
      small INT not null,
      medium INT not null,
      large INT not null,
      PRIMARY KEY (id)
  );  
  `)
  console.log("Clearing Table....")
  await client.query('DELETE FROM shirts')
  console.log("Adding inital shirts")

  await client.query( 'INSERT INTO shirts (design,small,medium,large) VALUES(?,?,?,?)', ["design1",10,5,1]);
  await client.query( 'INSERT INTO shirts (design,small,medium,large) VALUES(?,?,?,?)', ["design2",3,2,5]);
  await client.query( 'INSERT INTO shirts (design,small,medium,large) VALUES(?,?,?,?)', ["design3",1,3,2]);
  
  // Run clean up function
  await client.end()
  return "Success"
}




const getAllShirts = async () => {
  console.log("Gettting all Shirts")
  let shirts = []
  const shirtResults = await client.query(` select * from shirts`)
  for(const shirt of shirtResults){
    const {id,design,small,medium,large} = shirt
    console.log(`Shirt ID:${id} - ${design} : small QTY: ${small} | medium QTY: ${medium} | large QTY: ${large} `)
    shirts.push({id,design,small,medium,large})
  }
  return shirts
}

const purchaseShirt = async (id:Number,size:string,qty:Number) => {
  console.log(`Purchasing Shirt:  id: ${id},size: ${size}, purchase qty:${qty}`)
  
   await client.query(`UPDATE shirts SET ${size} = ${size} - ${qty} WHERE id = ${id} AND ${size}-${qty}>= 0; `)
  
   const shirtUpdateResult = await client.query(`SELECT * from shirts WHERE id = ${id}; `)  
  console.log("shirtUpdateResult: ",shirtUpdateResult[0])

  return shirtUpdateResult[0]
}



export const resolvers = {


  Query: {
    
    hello: () => 'Hello world!',
    getAll: async () => { return await getAllShirts() }
  },
  Mutation: {
    reset:  async () => { return await resetdb()},   
    purchase: async (_:any,params:any)=>{
    
      console.log("trying to purchase with params: ", params)
      const {id,size,qty} = params;
  
      return await purchaseShirt(id,size,qty)
    }   

  }
};
