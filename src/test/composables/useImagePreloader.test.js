import { describe, it, expect, vi } from 'vitest'
import { preloadImages } from '@/composables/useImagePreloader.js'

describe('useImagePreloader', () => {
  it('should preload images successfully', async () => {
    // Mock Image constructor
    global.Image = vi.fn().mockImplementation(() => ({
      addEventListener: vi.fn((event, handler) => {
        if (event === 'load') {
          setTimeout(handler, 10)
        }
      }),
      removeEventListener: vi.fn(),
      src: '',
    }))

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
    global.Image = vi.fn().mockImplementation(() => ({
      addEventListener: vi.fn((event, handler) => {
        if (event === 'error') {
          setTimeout(handler, 10)
        }
      }),
      removeEventListener: vi.fn(),
      src: '',
    }))

    const imageUrls = ['/non-existent-image.jpg']

    const result = await preloadImages(imageUrls)
    expect(result).toEqual(imageUrls)
  })
})
