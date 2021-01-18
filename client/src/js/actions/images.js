'use-strict'
import { FireStorage } from './firebase';
import { FireAuth } from '../actions/firebase';
import { APIS } from '../constants'

// const getUserStoragePath = (uid) => {
//   return `images/${uid}/private`
// }

export const getMetadataForAllImages = async () => {
  const user = FireAuth.currentUser;
  const token = user && (await user.getIdToken());
  const request = new Request(APIS.all_images, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await fetch(request);
  console.log('RES', response);
  return response.json()
}

export const imgDownloadURL = async (path, setLink) => {
  const link = await FireStorage.ref(path).getDownloadURL();
  setLink(link);
}

export const uploadImageRequest = async (files) => {
  const user = FireAuth.currentUser;
  const token = user && (await user.getIdToken());

  const formdata = new FormData();
  files.forEach(file => {
    formdata.append('file', file)
  })

  const request = new Request(APIS.upload_images, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body:formdata
  });

  const response = await fetch(request);
  return response.json()
}

export const deleteImages = async (filePaths) => {
  console.log("PATHS", filePaths);
  const user = FireAuth.currentUser;
  const token = user && (await user.getIdToken());

  const request = new Request(APIS.remove_images, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filePaths }),
  });

  const response = await fetch(request);
  return response.json()
}

export const makeImgPublic = async (path) => {
  const user = FireAuth.currentUser;
  const token = user && (await user.getIdToken());

  const request = new Request(APIS.makePublic_image, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filePath: path }),
  })

  const response = await fetch(request);
  return response.json()
}

export const makeImgPrivate = async (path) => {
  const user = FireAuth.currentUser;
  const token = user && (await user.getIdToken());

  const request = new Request(APIS.makePrivate_image, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filePath: path }),
  })

  const response = await fetch(request);
  return response.json()
}

// export const getImageSecurely = async (name) => {
//   const user = FireAuth.currentUser;
//   const token = user && (await user.getIdToken());
//   console.log(token)
//   const headers = new Headers();
//   headers.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbm90LWlnLTkzNjZjIiwiYXVkIjoibm90LWlnLTkzNjZjIiwiYXV0aF90aW1lIjoxNjEwODcyMzY4LCJ1c2VyX2lkIjoiYkthSHZadnppM2JheFpHT1hOS2p3UUJPRGJyMSIsInN1YiI6ImJLYUh2WnZ6aTNiYXhaR09YTktqd1FCT0RicjEiLCJpYXQiOjE2MTA5MDcyOTksImV4cCI6MTYxMDkxMDg5OSwiZW1haWwiOiJ0ZXN0QHRlc3QxMjMwMC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0MTIzMDAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PTNT6t7tF7E0uWsb86L33QSkrmHDFRqvKWK-TltPqh3An8zOnC8OXD0bhIQHveaIYAJkVtR9wcS9cmmAYam3b8qcE7E3WKfwntOHKkted4DDvNkj7iVdEU0tSdwCMrVCHiCSWAfk0oyrXE7KCiRQpbTx8147BzmHIrnp6zJ5OHhc4J1W8aNKUuPD3nO5yKKJ51MRpAynJzQCc4acmnNFdmz9B62e6s5bWbOm-xSJKCCs1owKxmgSSHzQsuA7XtqaN2Id5WMcWixq6Yv8KiqdtpKcnivxdzVc51EttsE8X3lDLQMsufqodeNdH2T_giL1ZrH8jWmCDuZh5VRAnIoCNw");
//   const request = new Request(APIS.bucket_image(name), {
//     method: 'GET',
//     mode: 'no-cors',
//     headers,
//     redirect: 'follow'
//   });

//   const response = await fetch(request);
//   console.log('IMA', name, await response.blob());
//   return response;
// }
