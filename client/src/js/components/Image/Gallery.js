import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { 
  getMetadataForAllImages, 
  uploadImageRequest, 
  deleteImages, 
  makeImgPublic, 
  makeImgPrivate 
} from '../../actions/images';
import { useAuth } from '../../contexts/AuthCtx';
import ImageCard from './Card';
import UploadCard from '../UploadCard';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const GalleryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 15px;
  height: 100%;
`;

const UploadBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px 15px 0px 15px;
  height: 10vh;
`;

const SelectedHeaderWrapper = styled.div` 
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 20px;
`;


export default function ImageGallery () {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImgs, setSelectedImgs] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const { activeUser } = useAuth();
 
  const generateImgCards = async () => {
    if (activeUser !== null) {
      const result = await getMetadataForAllImages()
      // .then(images => {
      //   console.log("DONE", images)
      //   for (let i = 0; i < images.length; i++) {
      //     const path = images[i].fullPath
      //     console.log(images[i].fullPath);
      //     result.push(APIS.bucket_image(path));
      //   }
      // })
      // .catch(error => {
      //   console.log(error)
      // })
      console.log("CHEL", result.files);
      setImages(result.files);
    }
    setLoading(false);
  }

  const selectHandler = async (event, file) => {
    if (event.target.checked) {
      selectedImgs[file.name] = file
    } else {
      delete selectedImgs[file.name];
    }
    console.log("SELECTED", selectedImgs)
    setSelectedImgs(selectedImgs);
    setSelectedCount(Object.keys(selectedImgs).length)
    console.log("COUNT", selectedCount)
  }

  const changeDomainHandler = async (domain, name) => {
    setLoading(false);
    domain === 'public' ? 
    await makeImgPrivate(name) :
    await makeImgPublic(name)
    await generateImgCards();
  }

  useEffect(() => {
    generateImgCards();
  }, [])
  
  return (
    <>
      {activeUser !== null ? (
        <>
          <UploadBtnWrapper>
            <UploadCard 
              uploadHandler={async (files) => {
                setLoading(true);
                setImages([])
                await uploadImageRequest(files);
                setSelectedCount(0);
                setSelectedImgs({});
                setTimeout(() => {generateImgCards()}, 1000);
              }}
            />
          </UploadBtnWrapper>
          <SelectedHeaderWrapper>
            <h2>
              Selected: {selectedCount}
            </h2>
            <Button
              disabled={selectedCount === 0}
              variant="contained" 
              color="secondary" 
              onClick={async () => {
                await deleteImages(Object.keys(selectedImgs));
                generateImgCards();
                setSelectedCount(0);
                setSelectedImgs({});
              }}
            >
              Delete
            </Button>
            
          </SelectedHeaderWrapper>
        </>
      ) : ''}
      {(loading ?
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>:
        <GalleryWrapper>
          {images.map(img => {
            console.log(img);
            return (
              <ImageCard 
                key={img.id} 
                data={img} 
                onSelectedHandler={selectHandler} 
                domainHandler={changeDomainHandler}
              />
            )
          })}
        </GalleryWrapper>
      )}
    </>
  ) 
}
