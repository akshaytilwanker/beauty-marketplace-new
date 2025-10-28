export default function ColorPalette() {
  const colorGroups = [
    {
      name: 'Primary Colors',
      colors: [
        { name: 'Rose Pink', value: '#ff6b9d', cssVar: 'var(--rose-pink)' },
        { name: 'Soft White', value: '#fff9fb', cssVar: 'var(--soft-white)' },
        { name: 'Light Grey', value: '#f8f9fa', cssVar: 'var(--light-grey)' },
      ]
    },
    {
      name: 'Accent Colors',
      colors: [
        { name: 'Accent Purple', value: '#9c89ff', cssVar: 'var(--accent-purple)' },
        { name: 'Accent Gold', value: '#ffd166', cssVar: 'var(--accent-gold)' },
        { name: 'Accent Teal', value: '#06d6a0', cssVar: 'var(--accent-teal)' },
      ]
    },
    {
      name: 'Text Colors',
      colors: [
        { name: 'Dark Text', value: '#2d3748', cssVar: 'var(--dark-text)' },
        { name: 'Darker Text', value: '#1a202c', cssVar: 'var(--darker-text)' },
      ]
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-heading font-bold text-dark-text mb-6">
        Beauty Marketplace Color Palette
      </h2>
      
      {colorGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <h3 className="text-lg font-body font-semibold text-dark-grey mb-4">
            {group.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="flex items-center p-4 rounded-lg border border-gray-200"
              >
                <div
                  className="w-16 h-16 rounded-lg mr-4 border border-gray-300"
                  style={{ backgroundColor: color.value }}
                ></div>
                <div>
                  <p className="font-body font-semibold text-dark-text">
                    {color.name}
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    {color.value}
                  </p>
                  <p className="font-body text-xs text-gray-500">
                    {color.cssVar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}