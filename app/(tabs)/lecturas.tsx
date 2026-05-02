import ButtonComponent from '@/components/Button';
import DefaultScreen from '@/components/Default-screen';
import InputComponent from '@/components/Input';
import { ModalConfirm } from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/hooks/useLocation';
import { service_post_lectura } from '@/services/lecturas';
import { LecturaCreate } from '@/types/lectura';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function TabOneScreen() {
  const { user } = useAuth();
  const { cords, error: errorPermission, fetchLocation } = useLocation();

  const [contratoId, setContratoId] = useState("e3772406-26e5-4578-93a1-a0d7c9d63c61");
  const [valor, setValor] = useState("");
  const [onModal, setOnModal] = useState(false);
  const [error, setError] = useState<string>("");
  const [isSend, setIsSend] = useState(false);

  // Estados para capturar errores de validación local
  const [errors, setErrors] = useState<{ contratoId?: string; valor?: string }>({});

  // Función de validación
  function validateForm(): boolean {
    const localErrors: { contratoId?: string; valor?: string } = {};

    // Validar ID de Contrato
    if (!contratoId.trim()) {
      localErrors.contratoId = "El código del contrato es obligatorio.";
    } else if (contratoId.trim().length < 5) {
      localErrors.contratoId = "El código del contrato no es válido.";
    }

    // Validar Valor de la Lectura
    if (!valor.trim()) {
      localErrors.valor = "El valor de la lectura es obligatorio.";
    } else if (isNaN(Number(valor)) || Number(valor) <= 0) {
      localErrors.valor = "Ingresa un valor numérico válido y mayor a 0.";
    }

    setErrors(localErrors);

    // Si el objeto localErrors no tiene propiedades, el formulario es válido
    return Object.keys(localErrors).length === 0;
  }

  async function handleCreateLectura() {
    // 1. Ejecutar validación
    if (!validateForm()) return;

    setIsSend(true);
    setError(""); // Limpiar errores previos de red o API

    const lectura: LecturaCreate = {
      contratoId: contratoId.trim(),
      fotoUrl: "pruebas",
      latitud: String(cords?.latitude ?? "0"),
      longitud: String(cords?.longitud ?? "0"),
      valorLectura: Number(valor),
    };

    try {
      await service_post_lectura(lectura, user?.token ?? "");
      setContratoId("");
      setValor("");
    } catch (e) {
      console.log(e);
      setError("No se pudo registrar la lectura. Inténtalo de nuevo.");
    } finally {
      setIsSend(false);
      setOnModal(true);
    }
  }

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

      <ButtonComponent
        text="Registrar lectura"
        loading={isSend}
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

const styles = StyleSheet.create({
  errorText: {
    color: '#ff3333',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 4,
    alignSelf: 'flex-start',
  },
});