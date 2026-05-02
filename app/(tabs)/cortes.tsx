import ButtonComponent from '@/components/Button';
import DefaultScreen from '@/components/Default-screen';
import InputComponent from '@/components/Input';
import { ModalConfirm } from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/hooks/useLocation';
import { service_post_cortes } from '@/services/cortes';
import { CorteCreate } from '@/types/corte';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';


export default function Cortes() {
  const { user } = useAuth();
  const { cords, error: errorPermission, fetchLocation } = useLocation();

  const [contratoId, setContratoId] = useState("e3772406-26e5-4578-93a1-a0d7c9d63c61");
  const [motivo, setMotivo] = useState("");
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
    if (!motivo.trim()) {
      localErrors.valor = "El valor de la lectura es obligatorio.";
    }

    setErrors(localErrors);

    // Si el objeto localErrors no tiene propiedades, el formulario es válido
    return Object.keys(localErrors).length === 0;
  }

  async function handleCreateCortes() {
    // 1. Ejecutar validación
    if (!validateForm()) return;

    setIsSend(true);
    setError("");

    const corte: CorteCreate = {
      contratoId: contratoId.trim(),
      fotoUrl: "pruebas",
      latitud: String(cords?.latitude ?? "0"),
      longitud: String(cords?.longitud ?? "0"),
      motivo: motivo
    };

    try {
      await service_post_cortes(corte, user?.token ?? "");
      setContratoId("");
      setMotivo("");
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
        title="Motivo"
        value={motivo}
        palceHodler="Ingresa el motivo del corte"
        onChange={(text) => {
          setMotivo(text);
          if (errors.valor) setErrors({ ...errors, valor: undefined });
        }}
        error={errors.valor}
      />

      <ButtonComponent
        text="Registrar lectura"
        loading={isSend}
        onPress={handleCreateCortes}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
