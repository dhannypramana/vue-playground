import Swal from "sweetalert2";

export const useSwal = () => {
    const baseOptions = {
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Submit now!',
    }

    const Modal = {
        options: baseOptions,
        Fire() {
            return new Promise((resolve, reject) => {
                Swal.fire(this.options)
                    .then(r => {
                        //Reset Options
                        this.options = baseOptions

                        if (r.isConfirmed) {
                            resolve(r)
                        }
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        Confirm(params) {
            this.options = {
                icon: 'warning',
                width: '500px',
                ...this.options,
                ...params,
            }

            return this
        },
        Custom(params) {
            this.options = {
                width: '800px',
                ...params,
                ...this.options,
            }

            return this
        },
        validationMessage(msg) {
            return Swal.showValidationMessage(msg)
        }
    }

    const Toast = {
        options: {
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        },
        fire: async function () {
            await Swal.fire(this.options)
        },
        Success(msg) {
            this.options = {
                ...this.options,
                icon: "success",
                // title: "Success!",
                text: msg
            }

            return this.fire()
        },
        Error(msg) {
            this.options = {
                ...this.options,
                icon: "error",
                title: "Error",
                text: msg
            }

            return this.fire()
        }
    }

    return {
        Toast,
        Modal
    }
}
