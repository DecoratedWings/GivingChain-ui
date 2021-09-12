import { create } from 'ipfs-http-client';
import { useState } from 'react';

const client = create('https://ipfs.infura.io:5001/api/v0')

function IpfsUpload () {
    const [fileUrl, updateFileUrl] = useState(``);
    const [cidHash, updateHash] = useState(``);
    async function onChange(e) {
      const file = e.target.files[0]
      try {
        const added = await client.add(file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        const pathAdd = `${added.path}`;
        updateFileUrl(url)
        updateHash(pathAdd)
        console.log('uploaded with url: ', url);
      } catch (error) {
        console.log(' Error uploading file: ', error)
      }  
    }
    return (
        <div className="ipfs" >
          <h1>IPFS Upload to Generate CID</h1>
       
          <input type="file" onChange={onChange}/>
    
          {
            fileUrl && (
              <img src={fileUrl} width="600px" alt={cidHash}/>
            )
          }
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh'
        }}>
            url is: {fileUrl}
            <br/>
            <br/>
            added path is: {cidHash}
          </div>
        </div>
      );
}
export default IpfsUpload;