import { DirectUpload } from "@rails/activestorage"

// The upload function for Rails apps: register it once with
//   import { uploads } from "uniform"
//   import { activeStorageUpload } from "uniform/active_storage"
//   uploads.upload = activeStorageUpload
// It returns the blob's signed id, which Active Storage attaches on save.
export const activeStorageUpload = (file, { url, progress, signal }) => {
  const attempt = () => new Promise((resolve, reject) => {
    const delegate = {
      directUploadWillStoreFileWithXHR(xhr) {
        signal?.addEventListener("abort", () => xhr.abort(), { once: true })
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) progress(event.loaded / event.total)
        })
      }
    }
    new DirectUpload(file, url, delegate).create((error, blob) => {
      if (error) reject(new Error(String(error)))
      else resolve(blob.signed_id)
    })
  })

  // A deploy restarts the app, and creating the blob in that window gets a 502
  // to 504 from the proxy. One retry after a pause rides it out.
  return attempt().catch(async (error) => {
    if (signal?.aborted || !/Status: 50[234]\b/.test(error.message)) throw error
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return attempt()
  })
}
