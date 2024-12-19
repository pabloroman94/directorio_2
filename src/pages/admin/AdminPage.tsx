import { useState } from 'react';
import AdminView from '../../components/admin/AdminView';
import AdminModal from '../../components/admin/AdminModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import { useAdmin } from '../../hooks/useAdmin';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { Professional } from '../../types';

export default function AdminPage() {
  const { professionals, isLoading, deleteProfessional, updateProfessional, addProfessional } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | undefined>();

  const handleDelete = async (id: string) => {
    const professional = professionals.find(p => p.id === id);
    if (professional) {
      setSelectedProfessional(professional);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedProfessional) {
      try {
        await deleteProfessional(selectedProfessional.id);
      } finally {
        setShowDeleteModal(false);
        setSelectedProfessional(undefined);
      }
    }
  };

  const handleEdit = (professional: Professional) => {
    setSelectedProfessional(professional);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedProfessional(undefined);
    setShowModal(true);
  };

  const handleToggleStatus = async (professional: Professional) => {
    try {
      await updateProfessional({
        ...professional,
        status: professional.status === 'active' ? 'inactive' : 'active'
      });
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  const handleSave = async (professional: Professional) => {
    try {
      if (selectedProfessional) {
        await updateProfessional(professional);
      } else {
        await addProfessional(professional);
      }
      setShowModal(false);
      setSelectedProfessional(undefined);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <AdminView
        professionals={professionals}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAdd={handleAdd}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />
      
      {showModal && (
        <AdminModal
          professional={selectedProfessional}
          onClose={() => {
            setShowModal(false);
            setSelectedProfessional(undefined);
          }}
          onSave={handleSave}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProfessional(undefined);
        }}
        onConfirm={handleConfirmDelete}
        name={selectedProfessional?.fullName || ''}
      />
    </>
  );
}