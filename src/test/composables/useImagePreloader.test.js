import { describe, it, expect, vi, beforeEach } from 'vitest'
import { preloadImages } from '@/composables/useImagePreloader.js'

describe('useImagePreloader', () => {
  beforeEach(() => {
    // 重置 Image mock
    vi.restoreAllMocks()
  })

  it('should preload images successfully', async () => {
    // Mock Image constructor
    global.Image = vi.fn().mockImplementation(() => {
      const img = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        src: '',
      }

      // 模擬圖片載入成功
      setTimeout(() => {
        const loadHandler = img.addEventListener.mock.calls.find(call => call[0] === 'load')?.[1]
        if (loadHandler) loadHandler()
      }, 0)

      return img
    })

    const imageUrls = ['/test-image-1.jpg', '/test-image-2.jpg']
    const result = await preloadImages(imageUrls)

    expect(result).toEqual(imageUrls)
    expect(global.Image).toHaveBeenCalledTimes(2)
  })

  it('should handle empty array', async () => {
    const result = await preloadImages([])
    expect(result).toEqual([])
  })

  it('should handle image load errors gracefully', async () => {
    global.Image = vi.fn().mockImplementation(() => {
      const img = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        src: '',
      }

      // 模擬圖片載入錯誤
      setTimeout(() => {
        const errorHandler = img.addEventListener.mock.calls.find(call => call[0] === 'error')?.[1]
        if (errorHandler) errorHandler()
      }, 0)

      return img
    })

    const imageUrls = ['/non-existent-image.jpg']
    const result = await preloadImages(imageUrls)

    expect(result).toEqual(imageUrls)
  })
})
