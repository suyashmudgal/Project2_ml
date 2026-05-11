export const filters = [
  {
    id: 'top_edge',
    name: 'Edge - Top',
    category: 'Edge',
    data: [
      [ 1,  1,  1],
      [ 0,  0,  0],
      [-1, -1, -1]
    ]
  },
  {
    id: 'bottom_edge',
    name: 'Edge - Bottom',
    category: 'Edge',
    data: [
      [-1, -1, -1],
      [ 0,  0,  0],
      [ 1,  1,  1]
    ]
  },
  {
    id: 'left_edge',
    name: 'Edge - Left',
    category: 'Edge',
    data: [
      [ 1,  0, -1],
      [ 1,  0, -1],
      [ 1,  0, -1]
    ]
  },
  {
    id: 'right_edge',
    name: 'Edge - Right',
    category: 'Edge',
    data: [
      [-1,  0,  1],
      [-1,  0,  1],
      [-1,  0,  1]
    ]
  },
  {
    id: 'prewitt_top',
    name: 'Prewitt - Top',
    category: 'Prewitt',
    data: [
      [ 1,  1,  1],
      [ 0,  0,  0],
      [-1, -1, -1]
    ]
  },
  {
    id: 'prewitt_bottom',
    name: 'Prewitt - Bottom',
    category: 'Prewitt',
    data: [
      [-1, -1, -1],
      [ 0,  0,  0],
      [ 1,  1,  1]
    ]
  },
  {
    id: 'prewitt_left',
    name: 'Prewitt - Left',
    category: 'Prewitt',
    data: [
      [ 1,  0, -1],
      [ 1,  0, -1],
      [ 1,  0, -1]
    ]
  },
  {
    id: 'prewitt_right',
    name: 'Prewitt - Right',
    category: 'Prewitt',
    data: [
      [-1,  0,  1],
      [-1,  0,  1],
      [-1,  0,  1]
    ]
  },
  {
    id: 'sobel_top',
    name: 'Sobel - Top',
    category: 'Sobel',
    data: [
      [ 1,  2,  1],
      [ 0,  0,  0],
      [-1, -2, -1]
    ]
  },
  {
    id: 'sobel_bottom',
    name: 'Sobel - Bottom',
    category: 'Sobel',
    data: [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1]
    ]
  },
  {
    id: 'sobel_left',
    name: 'Sobel - Left',
    category: 'Sobel',
    data: [
      [ 1,  0, -1],
      [ 2,  0, -2],
      [ 1,  0, -1]
    ]
  },
  {
    id: 'sobel_right',
    name: 'Sobel - Right',
    category: 'Sobel',
    data: [
      [-1,  0,  1],
      [-2,  0,  2],
      [-1,  0,  1]
    ]
  },
  {
    id: 'laplacian',
    name: 'Laplacian',
    category: 'Laplacian',
    data: [
      [ 0,  1,  0],
      [ 1, -4,  1],
      [ 0,  1,  0]
    ]
  },
  {
    id: 'sharpen',
    name: 'Sharpen',
    category: 'Other',
    data: [
      [ 0, -1,  0],
      [-1,  5, -1],
      [ 0, -1,  0]
    ]
  },
  {
    id: 'blur',
    name: 'Box Blur',
    category: 'Other',
    data: [
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9]
    ]
  },
  {
    id: 'identity',
    name: 'Identity',
    category: 'Other',
    data: [
      [ 0,  0,  0],
      [ 0,  1,  0],
      [ 0,  0,  0]
    ]
  }
];
