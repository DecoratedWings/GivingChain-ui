# Giving Chain front end Code

Please see video below for currently basic functionality. 
This repo will be integrated with a backend and Hyperledger Firefly.

## Steps

In the project directory, you can run:

### `npm install`

### `npm start`

## Proof of Concept Code 

### Model 1 

Donors are able to submit donations which are minted as NFTs and broadcast to the blockchain network. 
Transporters view the private message details sent upon creation and can respond. Succesful pickup allows for 
donor to transfer the nft to the driver. The driver transfers the NFT to the Recipient on successful delivery. 

### Model 2 

Similar to Model 1, however the NGO makes the request for the donation from the donor. 
The rest of the flow is the same up until the recipient node, where the recipient indicates to the NGO
that the transaction was succesful. 


## Screens

### Home
General information about the giving chain
### Donor
Can create and view NFTs of donations and send messages to the transport node. 
Can transfer the donation NFT to Driver 
### Transport 
Can view specific private details of the donation.
Can transfer the donation NFT to the recipient.
### Recipient 
Can view the status of NFT ownership. When the delivery is successful the NFT will be in the hands of the recipient. 
### NGO
Can request for a donation which is broadcast to the network. The status of the request is viewable from this screen.

## Screenshots

![Screen Shot 2021-10-24 at 1 18 22 PM](https://user-images.githubusercontent.com/17859699/138625613-6d8fb240-7eec-47b1-ae03-399a9ef10658.png)

![Screen Shot 2021-10-24 at 1 22 33 PM](https://user-images.githubusercontent.com/17859699/138625644-51d27c30-c3f8-49a8-93a7-3aa9bfdfedaf.png)
![Screen Shot 2021-10-24 at 1 23 05 PM](https://user-images.githubusercontent.com/17859699/138625659-666cddf3-966e-434a-b4b0-032e9db284bb.png)
![Screen Shot 2021-10-24 at 1 23 58 PM](https://user-images.githubusercontent.com/17859699/138625708-93a4e32a-cc1c-4d2a-b68c-bd33be896cba.png)
