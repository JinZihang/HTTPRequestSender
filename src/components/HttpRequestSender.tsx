import { useState } from 'react';
import axios from 'axios';
import Spacer from './Spacer';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

const HttpRequestSender = () => {
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const [payload, setPayload] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [payloadError, setPayloadError] = useState(false);

  const handleMethodChange = (event: any) => {
    setMethod(event.target.value);
  };
  const handleUrlChange = (event: any) => {
    setUrl(event.target.value);
    setUrlError(false);
  };
  const handlePayloadChange = (event: any) => {
    setPayload(event.target.value);
    setPayloadError(false);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isValidJson = (json: string): boolean => {
    try {
      JSON.parse(json);
      return true;
    } catch (error) {
      return false;
    }
  };

  const sendRequest = () => {
    const request: any = { method, url };

    // Validate inputs
    const isValidMethodInput = method !== '';
    const isValidUrlInput = isValidUrl(url);
    if (!isValidUrlInput) {
      setUrlError(true);
    }
    let isValidPayloadInput = true;
    if (payload !== '') {
      isValidPayloadInput = isValidJson(payload);
      if (isValidPayloadInput) {
        request.data = JSON.parse(payload);
      }
    }
    if (
      !isValidMethodInput ||
      !isValidUrlInput ||
      (payload !== '' && !isValidPayloadInput)
    ) {
      return;
    }

    axios(request)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="request-method-label" required>
        Request Method
      </InputLabel>
      <Select
        labelId="request-method-label"
        id="request-method"
        className="request-input"
        value={method}
        label="Request Method *"
        onChange={handleMethodChange}
      >
        <MenuItem value={'GET'}>GET</MenuItem>
        <MenuItem value={'POST'}>POST</MenuItem>
        <MenuItem value={'PUT'}>PUT</MenuItem>
        <MenuItem value={'DELETE'}>DELETE</MenuItem>
      </Select>
      <Spacer />
      <TextField
        id="request-url"
        label="Request URL"
        className="request-input"
        variant="outlined"
        value={url}
        onChange={handleUrlChange}
        error={urlError}
        required
      />
      <Spacer />
      <TextField
        id="request-payload"
        label="Request Payload"
        className="request-input"
        variant="outlined"
        value={payload}
        onChange={handlePayloadChange}
        error={payloadError}
        multiline
        rows={10}
      />
      <Spacer />
      <Button variant="contained" onClick={sendRequest}>
        Send Request
      </Button>
    </FormControl>
  );
};

export default HttpRequestSender;
