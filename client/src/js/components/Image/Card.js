import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Checkbox }from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography';
import { imgDownloadURL } from '../../actions/images';
import styled from 'styled-components';

const ImageView = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;

`;

export default function ImageCard (props) {
  const NAME_IDX = 3;
  const DOMAIN_IDX = 2;
  const [data, setData] = useState(props.data);
  const [domain, setDomain] = useState('private');
  const [downloadLink, setDownloadLink] = useState('');

  const pathList = data.name.split("/")

  const useStyles = makeStyles({
    root: {
      maxWidth: 250,
    },
  });

  useEffect(() => {
    imgDownloadURL(data.name, setDownloadLink);
    setDomain(pathList[DOMAIN_IDX]);
  }, []);

  return (
    <Card raised className={useStyles().root} variant="outlined" >
      <ImageView src={downloadLink} alt="" height="300" />
      <CardContent>
        <Typography gutterBottom variant="body1">
          {pathList[NAME_IDX]}
        </Typography>
        <Typography gutterBottom variant="overline">
          {new Date(data.timeCreated).toLocaleString()}
        </Typography> <br/>
        <Button
          variant="outlined" 
          color="primary" 
          onClick={() => {
            props.domainHandler(domain, pathList[NAME_IDX])
          }}
        >
          Make {domain === 'public' ? 'private' : 'public'}
        </Button>
        <Typography align="right">
            <FormControlLabel
              value="Selected"
              control={
                <Checkbox 
                  color="primary" 
                  onChange={(event) => {props.onSelectedHandler(event, data)}}
                />
              }
              label="Selected"
              labelPlacement="start"
            />
          </Typography>
      </CardContent>
    </Card>
  )
}