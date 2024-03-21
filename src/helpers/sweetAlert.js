import Swal from 'sweetalert2'

const sweetAlert = {
  success: (title, text, timer) => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title || "成功",
        icon: "success",
        text: text || '',
        showConfirmButton: false,
        timer: timer || 1500,
        customClass: {
          title: 'swal-title',
        }
      }).then(result => {
        return resolve(result)
      })
    })
  },
  notice: (title, icon, text) => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title || "成功",
        icon: icon || "info",
        text: text || '',
        confirmButtonText: '是的',
        confirmButtonColor: '#3894F1',
        customClass: {
          title: 'swal-title',
        }
      }).then(result => {
        return resolve(result)
      })
    })
  },
  confirm: (title, text, html) => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title,
        text: text || '',
        html: html || '',
        showDenyButton: true,
        confirmButtonText: '是的',
        confirmButtonColor: '#3894F1',
        denyButtonText: '不要',
        denyButtonColor: '#F7647D',
        customClass: {
          title: 'swal-title',
        }
      }).then(result => {
        return resolve(result)
      })
    })
  },
  error: (title, text) => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title || '失敗',
        icon: "error",
        text: text || '',
        confirmButtonText: '好吧',
        confirmButtonColor: '#F7647D',
        customClass: {
          title: 'swal-title',
        }
      }).then(result => {
        return resolve(result)
      })
    })
  },
  editTagInput: (title, inputValue, placeholder, inputType) => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title || 'title',
        input: inputType || "text",
        inputPlaceholder: placeholder,
        inputValue,
        confirmButtonText: '修改',
        confirmButtonColor: '#3894F1',
        showDenyButton: true,
        denyButtonText: '刪除',
        denyButtonColor: '#F7647D',
        showCancelButton: true,
        cancelButtonText: '取消',
        inputAttributes: {
          "aria-label": "Type your input here"
        },
        customClass: {
          title: 'swal-title',
        }
      }).then(result => {
        resolve(result)
      })
    })
  },
  image: (url, size) => {
    Swal.fire({
      showConfirmButton: false,
      showCancelButton: false,
      imageWidth: size || '320px',
      background: `#fff`,
      imageUrl: url,
      showCloseButton: true,
      customClass: {
        closeButton: 'swal-close',
      }
    })
  },
  orderFrom: () => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: '買家資料',
        html: `
        <p>請輸入個人資料</p>
    <input type="text" id="name" class="swal2-input" placeholder="名稱">
    <input type="email" id="email" class="swal2-input" placeholder="信箱">
    <input type="text" id="ig" class="swal2-input" placeholder="IG帳號">
  `,
        showDenyButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#3894F1',
        denyButtonText: '取消',
        denyButtonColor: '#F7647D',
        customClass: {
          title: 'swal-title',
        },
        preConfirm: () => {
          const name = document.querySelector('#name').value.trim()
          const email = document.querySelector('#email').value.trim()
          const ig = document.querySelector('#ig').value.trim()
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          console.log(name, email ,ig)

          if (!name || !email || !ig) {
            Swal.showValidationMessage('請輸入全部資訊')
          }
          if (!emailRegex.test(email)) {
            Swal.showValidationMessage('請輸入有效的信箱')
          }
          return { name, email, ig }
        },
      }).then(result => {
        return resolve(result)
      })
    })
  },
}

export default sweetAlert
