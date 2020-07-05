import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import SplashScreen from '../../components/SplashScreen';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

interface SplashScreenProps {
  type: 'error' | 'info' | 'success';
  message: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [splashScreenProps, setSplashScreenProps] = useState<
    SplashScreenProps
  >();
  const [submited, setSubmited] = useState(false);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    if (!uploadedFiles.length) return;

    setSubmited(true);
    setSplashScreenProps({ type: 'info', message: 'Importando, aguarde...' });

    const filesData = uploadedFiles.map(file => {
      const data = new FormData();

      data.append('file', file.file);

      return data;
    });

    // TODO

    try {
      await Promise.all(
        filesData.map(importFile =>
          api.post('/transactions/import', importFile),
        ),
      );

      setSplashScreenProps({
        type: 'success',
        message: 'Dados importados com sucesso.',
      });

      setTimeout(() => {
        setSubmited(false);
      }, 3000);
      // await api.post('/transactions/import', data);
    } catch (err) {
      setSplashScreenProps({ type: 'error', message: err.message });

      setTimeout(() => {
        setSubmited(false);
      }, 3000);

      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    // TODO

    if (!files.length) return;

    const submitedFiles = files.map(file => {
      return {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
    });

    setUploadedFiles([...uploadedFiles, ...submitedFiles]);
  }

  return (
    <>
      {submited && splashScreenProps && (
        <SplashScreen
          type={splashScreenProps.type}
          message={splashScreenProps.message}
        />
      )}
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
