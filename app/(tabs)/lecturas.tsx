import ButtonComponent from '@/components/Button';
import { CameraModule } from '@/components/camera';
import DefaultScreen from '@/components/Default-screen';
import InputComponent from '@/components/Input';
import { ModalConfirm } from '@/components/Modal';
import { useLecturas } from '@/hooks/useLecturas';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {

   const { contratoId, valor, capture, error, errors, errorPermission, onModal, loadiong,
      setCapture, setContratoId, setValor, setError, setOnModal, fetchLocation, handleCreateLectura, setErrors
   } = useLecturas()
   const [camera, setCamera] = useState(false)

   useEffect(() => {
      const handlePruebas = async () => {
         await fetchLocation();
      };
      handlePruebas();
   }, []);

   return (
      <DefaultScreen>
         <InputComponent
            title="Contrato código"
            value={contratoId}
            palceHodler="Ingresa el código del contrato"
            onChange={(text) => {
               setContratoId(text);
               if (errors.contratoId) setErrors({ ...errors, contratoId: undefined });
            }}
            error={errors.contratoId}
         />

         <InputComponent
            title="Valor"
            value={valor}
            palceHodler="Ingresa el valor de la lectura"
            onChange={(text) => {
               setValor(text);
               if (errors.valor) setErrors({ ...errors, valor: undefined });
            }}
            error={errors.valor}
         />
         <CameraModule
            setPhoto={setCapture}
            visible={camera}
            setVisible={setCamera}
         />

         <ButtonComponent
            text="Registrar lectura"
            loading={loadiong}
            onPress={handleCreateLectura}
         />
         <ModalConfirm
            title={error ? "Error" : "Éxito"}
            message={error ? error : "La lectura fue registrada de manera correcta."}
            action={() => setOnModal(false)}
            visible={onModal}
         />
      </DefaultScreen>
   );
}