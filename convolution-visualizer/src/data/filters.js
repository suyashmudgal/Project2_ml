export const filters = [
  {
    id: 'top_edge',
    name: 'Top Edge',
    data: [
      [ 1,  1,  1],
      [ 0,  0,  0],
      [-1, -1, -1]
    ]
  },
  {
    id: 'bottom_edge',
    name: 'Bottom Edge',
    data: [
      [-1, -1, -1],
      [ 0,  0,  0],
      [ 1,  1,  1]
    ]
  },
  {
    id: 'left_edge',
    name: 'Left Edge',
    data: [
      [ 1,  0, -1],
      [ 1,  0, -1],
      [ 1,  0, -1]
    ]
  },
  {
    id: 'right_edge',
    name: 'Right Edge',
    data: [
      [-1,  0,  1],
      [-1,  0,  1],
      [-1,  0,  1]
    ]
  },
  {
    id: 'prewitt_top',
    name: 'Prewitt Top',
    data: [
      [ 1,  1,  1],
      [ 0,  0,  0],
      [-1, -1, -1]
    ]
  },
  {
    id: 'prewitt_bottom',
    name: 'Prewitt Bottom',
    data: [
      [-1, -1, -1],
      [ 0,  0,  0],
      [ 1,  1,  1]
    ]
  },
  {
    id: 'prewitt_left',
    name: 'Prewitt Left',
    data: [
      [ 1,  0, -1],
      [ 1,  0, -1],
      [ 1,  0, -1]
    ]
  },
  {
    id: 'prewitt_right',
    name: 'Prewitt Right',
    data: [
      [-1,  0,  1],
      [-1,  0,  1],
      [-1,  0,  1]
    ]
  },
  {
    id: 'sobel_top',
    name: 'Sobel Top',
    data: [
      [ 1,  2,  1],
      [ 0,  0,  0],
      [-1, -2, -1]
    ]
  },
  {
    id: 'sobel_bottom',
    name: 'Sobel Bottom',
    data: [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1]
    ]
  },
  {
    id: 'sobel_left',
    name: 'Sobel Left',
    data: [
      [ 1,  0, -1],
      [ 2,  0, -2],
      [ 1,  0, -1]
    ]
  },
  {
    id: 'sobel_right',
    name: 'Sobel Right',
    data: [
      [-1,  0,  1],
      [-2,  0,  2],
      [-1,  0,  1]
    ]
  }
];
