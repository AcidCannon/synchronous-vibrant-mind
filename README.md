# synchronous-vibrant-mind

Website:<br />
https://ualberta-cmput401.github.io/synchronous-vibrant-mind/

site deployed @ http://[2605:fd00:4:1001:f816:3eff:feb2:3536]  
peerjs deployed @ https://[2605:fd00:4:1001:f816:3eff:fef1:58d0]:9000

## Setup Instructions:  
### For site ### 
1. Clone this repo
```git clone https://github.com/UAlberta-CMPUT401/synchronous-vibrant-mind.git```
2. Change directory to the repo you just cloned
```cd synchronous-vibrant-mind```
3. Make sure you are on the branch "stable"
```git checkout stable```
4. Use docker-compose to build docker containers
```docker-compose up --build -d```  
### For peerjs server ###
1. Clone this repo
```git clone https://github.com/UAlberta-CMPUT401/synchronous-vibrant-mind.git```
2. Change directory to the repo you just cloned
```cd synchronous-vibrant-mind```
3. Make sure you are on the branch "stable"
```git checkout stable```
4. install peerjs server(you probably need sudo)  
```npm install peer -g```(if not work, try the following)  
```sudo npm install peer -g```  
5. running peerjs server  
```./start-peerjs.sh```(if not work, try the following command first and try this command again)  
```chmod +x start-peerjs.sh```

### FAQ ###
**1. Why I cannot login?**  
Please check if you have an IPv6 address first.  
**2. Why I click "I am ready" button, but no responding?**  
This is due to the self-signed SSL certificate is not trusted by your browser, you should access peerjs server with port 9000 first to allow signaling,  
suppose you have address https://[...]/webrtc?srcId=xxx&targetId=xxx&roomName=xxx,
you should first access https://[...]:9000 and allow your browser to trust.  
**3. Why my left bottom streaming box is always buffering?(there is a running loop)**  
This is because NAT traversal failed, and our connection is peer to peer.  
