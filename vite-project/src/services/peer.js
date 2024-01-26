class PeerService {
    constructor() {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
          ],
        });
      }
    }
  
    async getAnswer(offer) {
      if (this.peer) {
        await this.peer.setRemoteDescription(offer);
        const ans = await this.peer.createAnswer();
        await this.peer.setLocalDescription(new RTCSessionDescription(ans));
        return ans;
      }
    }
  
    async setLocalDescription(ans) {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    }
  
    async getOffer() {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    }
  }
  
//   export default new PeerService();
// class PeerService {
//   constructor() {
//     this.peer = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: [
//             "stun:stun.l.google.com:19302",
//             "stun:global.stun.twilio.com:3478",
//           ],
//         },
//       ],
//     });
//     this.localStream = null;
//   }

//   async getAnswer(offer) {
//     if (this.peer) {
//       await this.peer.setRemoteDescription(offer);
//       const ans = await this.peer.createAnswer();
//       await this.peer.setLocalDescription(new RTCSessionDescription(ans));
//       return ans;
//     }
//   }

//   async setLocalDescription(ans) {
//     if (this.peer) {
//       await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
//     }
//   }

//   async getOffer() {
//     if (this.peer) {
//       const offer = await this.peer.createOffer();
//       await this.peer.setLocalDescription(new RTCSessionDescription(offer));
//       return offer;
//     }
//   }

//   async addLocalStream(stream) {
//     if (this.peer && stream) {
//       stream.getTracks().forEach(track => {
//         this.peer.addTrack(track, stream);
//       });
//       this.localStream = stream;
//     }
//   }

//   async removeLocalStream() {
//     if (this.peer && this.localStream) {
//       this.localStream.getTracks().forEach(track => {
//         track.stop();
//         this.peer.removeTrack(this.peer.getSenders().find(sender => sender.track === track));
//       });
//       this.localStream = null;
//     }
//   }
// }

// export default new PeerService();
