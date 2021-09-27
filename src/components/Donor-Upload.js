import { useState } from 'react';
import NFTCard from './Card';


function DonorUpload () {

    const [data, updateData] = useState(``);
    const [txn, updateTxn] = useState(``);
    async function onChange(e) {
      const file = e.target.files[0]
      try {
        var blob;
        var binaryData = [];
        binaryData.push(file);
        blob = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
        updateData(blob)
        // updateTxn(pathAdd)
        console.log('Txn Hash for broadcast is: ', txn);
        console.log('Image uploaded: ', file);
        console.log("data is: ", data);
      } catch (error) {
        console.log(' Error uploading file: ', error)
      }  
    }

    return (
        <div className="NFT-Mint" >
          <h2>Upload Photo to generate NFT</h2>
            <br/>
          <input type="file" onChange={onChange}/>            

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh'
        }}>
            {/* Txn is: {txn} */}
     
          </div>

    
          {data? <NFTCard img={data}/> : null}
          
           
        </div>
      );

}
export default DonorUpload;