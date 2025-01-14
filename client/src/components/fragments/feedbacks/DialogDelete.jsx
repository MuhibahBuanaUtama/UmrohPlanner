import Dialog from "@/components/ui/feedbacks/Dialog";
import Button from "@/components/ui/commons/Button";

const DialogDelete = ({
  dialogOpen,
  handleCloseDialog,
  handleConfirmDelete,
}) => {
  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        childrenTitle="Konfirmasi"
        children={
          <>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="mt-6 flex items-center justify-end">
              <Button
                variant="quaternary"
                size="md"
                onClick={handleCloseDialog}
                children="Batal"
              />
              <Button
                className="bg-red-500 text-gray-200 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-900"
                size="md"
                onClick={handleConfirmDelete}
                children="Hapus"
              />
            </div>
          </>
        }
      />
    </>
  );
};

export default DialogDelete;
