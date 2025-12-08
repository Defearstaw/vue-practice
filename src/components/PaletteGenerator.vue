<template>
  <div class="palette-generator">
    <h2>Генератор цветовых палитр</h2>
    <p class="subtitle">Создавайте гармоничные цветовые схемы для ваших проектов</p>
    
    <!-- Управление палитрой -->
    <div class="controls">
      <div class="control-group">
        <label>Количество цветов:</label>
        <select v-model="colorsCount" class="control-select">
          <option value="3">3 цвета</option>
          <option value="5">5 цветов</option>
          <option value="7">7 цветов</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>Формат цвета:</label>
        <select v-model="colorFormat" class="control-select">
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>Тип палитры:</label>
        <select v-model="paletteType" class="control-select">
          <option value="random">Случайная</option>
          <option value="analogous">Аналогичная</option>
          <option value="monochromatic">Монохромная</option>
          <option value="complementary">Комплементарная</option>
        </select>
      </div>
      
      <button @click="generatePalette" class="generate-btn">Сгенерировать палитру</button>
      <button @click="savePalette" class="save-btn" :disabled="currentPalette.length === 0">
        Сохранить палитру
      </button>
    </div>
    
    <!-- Отображение текущей палитры -->
    <div class="current-palette" v-if="currentPalette.length > 0">
      <h3>Текущая палитра</h3>
      <div class="palette-colors">
        <div
          v-for="(color, index) in currentPalette"
          :key="index"
          class="color-card"
          :style="{ backgroundColor: color.hex }"
          @click="copyToClipboard(color)"
          :class="{ pinned: color.pinned }"
        >
          <div class="color-info">
            <div class="color-value">{{ getFormattedColor(color) }}</div>
            <div class="color-actions">
              <button
                @click.stop="togglePinColor(index)"
                class="pin-btn"
                :title="color.pinned ? 'Открепить' : 'Закрепить'"
              >
                📌
              </button>
              <button
                @click.stop="editColor(index)"
                class="edit-btn"
                title="Изменить цвет"
              >
                ✎
              </button>
            </div>
          </div>
          <div v-if="color.copied" class="copy-notification">Скопировано!</div>
        </div>
      </div>
    </div>
    
    <!-- Сохраненные палитры -->
    <div class="saved-palettes" v-if="savedPalettes.length > 0">
      <h3>Сохраненные палитры ({{ savedPalettes.length }})</h3>
      <div class="palettes-list">
        <div
          v-for="(palette, index) in savedPalettes"
          :key="index"
          class="saved-palette"
        >
          <div class="palette-header">
            <span class="palette-name">{{ palette.name || `Палитра ${index + 1}` }}</span>
            <button @click="removePalette(index)" class="delete-btn" title="Удалить">×</button>
          </div>
          <div class="palette-colors">
            <div
              v-for="color in palette.colors"
              :key="color.hex"
              class="saved-color"
              :style="{ backgroundColor: color.hex }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Препью интерфейса -->
    <div class="preview-section">
      <h3>Превью интерфейса</h3>
      <div class="preview-container">
        <div class="preview-header" :style="{ backgroundColor: currentPalette[0]?.hex || '#667eea' }">
          <h4>Заголовок приложения</h4>
        </div>
        <div class="preview-content">
          <div class="preview-sidebar" :style="{ backgroundColor: currentPalette[1]?.hex || '#764ba2' }">
            <p>Меню</p>
          </div>
          <div class="preview-main">
            <div class="preview-card" :style="{ backgroundColor: currentPalette[2]?.hex || '#f8f9fa' }">
              <p>Карточка с контентом</p>
              <button class="preview-btn" :style="{ backgroundColor: currentPalette[3]?.hex || '#28a745' }">
                Кнопка
              </button>
            </div>
          </div>
        </div>
        <div class="preview-footer" :style="{ backgroundColor: currentPalette[4]?.hex || '#333' }">
          <p>Футер</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Конфигурация
const colorsCount = ref(5)
const colorFormat = ref('hex')
const paletteType = ref('random')

// Текущая палитра
const currentPalette = ref([])

// Сохраненные палитры
const savedPalettes = ref([])

// Генерация случайного цвета в формате HEX
const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

// Генерация аналогичных цветов
const generateAnalogousColors = (baseColor) => {
  const colors = []
  const hue = Math.floor(Math.random() * 360)
  
  for (let i = 0; i < colorsCount.value; i++) {
    const newHue = (hue + i * 30) % 360
    colors.push(hslToHex(newHue, 70, 60))
  }
  
  return colors
}

// Преобразование HSL в HEX
const hslToHex = (h, s, l) => {
  h /= 360
  s /= 100
  l /= 100
  
  let r, g, b
  
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Преобразование HEX в RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Форматирование цвета в зависимости от выбранного формата
const getFormattedColor = (color) => {
  if (colorFormat.value === 'rgb' && color.rgb) {
    return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
  }
  return color.hex.toUpperCase()
}

// Генерация палитры
const generatePalette = () => {
  const colors = []
  
  // Сохраняем закрепленные цвета
  const pinnedColors = currentPalette.value.filter(c => c.pinned)
  
  // Генерация новых цветов в зависимости от типа палитры
  for (let i = 0; i < colorsCount.value; i++) {
    if (i < pinnedColors.length) {
      colors.push({ ...pinnedColors[i] })
    } else {
      let hexColor
      
      switch (paletteType.value) {
        case 'analogous':
          const analogousColors = generateAnalogousColors()
          hexColor = analogousColors[i - pinnedColors.length] || generateRandomColor()
          break
        case 'monochromatic':
          const baseHue = Math.floor(Math.random() * 360)
          const lightness = 30 + Math.floor(Math.random() * 40)
          hexColor = hslToHex(baseHue, 70, lightness)
          break
        case 'complementary':
          const hue = Math.floor(Math.random() * 360)
          const complementaryHue = (hue + 180) % 360
          hexColor = i % 2 === 0 ? hslToHex(hue, 70, 60) : hslToHex(complementaryHue, 70, 60)
          break
        default:
          hexColor = generateRandomColor()
      }
      
      const rgb = hexToRgb(hexColor)
      colors.push({
        hex: hexColor,
        rgb: rgb,
        pinned: false,
        copied: false
      })
    }
  }
  
  currentPalette.value = colors
  saveToLocalStorage()
}

// Копирование цвета в буфер обмена
const copyToClipboard = async (color) => {
  const text = getFormattedColor(color)
  
  try {
    await navigator.clipboard.writeText(text)
    color.copied = true
    
    setTimeout(() => {
      color.copied = false
    }, 2000)
  } catch (err) {
    console.error('Ошибка копирования:', err)
    alert('Не удалось скопировать цвет')
  }
}

// Закрепление/открепление цвета
const togglePinColor = (index) => {
  currentPalette.value[index].pinned = !currentPalette.value[index].pinned
  saveToLocalStorage()
}

// Редактирование цвета
const editColor = (index) => {
  const newColor = prompt('Введите новый цвет в формате HEX (#RRGGBB):', currentPalette.value[index].hex)
  if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
    currentPalette.value[index].hex = newColor.toLowerCase()
    currentPalette.value[index].rgb = hexToRgb(newColor)
    saveToLocalStorage()
  }
}

// Сохранение текущей палитры
const savePalette = () => {
  if (currentPalette.value.length === 0) return
  
  const paletteName = prompt('Введите название палитры:', `Палитра ${savedPalettes.value.length + 1}`)
  
  if (paletteName) {
    savedPalettes.value.push({
      name: paletteName,
      colors: [...currentPalette.value],
      date: new Date().toISOString()
    })
    
    saveToLocalStorage()
    alert('Палитра сохранена!')
  }
}

// Удаление сохраненной палитры
const removePalette = (index) => {
  if (confirm('Удалить эту палитру?')) {
    savedPalettes.value.splice(index, 1)
    saveToLocalStorage()
  }
}

// Сохранение в localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('vuePaletteGenerator', JSON.stringify({
    currentPalette: currentPalette.value,
    savedPalettes: savedPalettes.value,
    settings: {
      colorsCount: colorsCount.value,
      colorFormat: colorFormat.value,
      paletteType: paletteType.value
    }
  }))
}

// Загрузка из localStorage
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('vuePaletteGenerator')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      currentPalette.value = data.currentPalette || []
      savedPalettes.value = data.savedPalettes || []
      
      if (data.settings) {
        colorsCount.value = data.settings.colorsCount || 5
        colorFormat.value = data.settings.colorFormat || 'hex'
        paletteType.value = data.settings.paletteType || 'random'
      }
    } catch (e) {
      console.error('Ошибка загрузки из localStorage:', e)
    }
  }
}

// Инициализация
onMounted(() => {
  loadFromLocalStorage()
  if (currentPalette.value.length === 0) {
    generatePalette()
  }
})
</script>

<style scoped>
.palette-generator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  align-items: flex-end;
}

.control-group {
  flex: 1;
  min-width: 150px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.control-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.generate-btn, .save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.generate-btn {
  background-color: #007bff;
  color: white;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-palette {
  margin-bottom: 40px;
}

.palette-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.color-card {
  flex: 1;
  min-width: 150px;
  height: 120px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  overflow: hidden;
  border: 2px solid transparent;
}

.color-card:hover {
  transform: translateY(-5px);
}

.color-card.pinned {
  border-color: #ffc107;
}

.color-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-value {
  font-family: monospace;
  font-size: 12px;
}

.color-actions {
  display: flex;
  gap: 5px;
}

.pin-btn, .edit-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 5px;
}

.copy-notification {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  animation: fadeInOut 2s;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

.saved-palettes {
  margin-bottom: 40px;
}

.palettes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.saved-palette {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
}

.palette-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.palette-name {
  font-weight: bold;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #dc3545;
}

.saved-color {
  height: 30px;
  flex: 1;
  min-width: 30px;
  border-radius: 4px;
}

.preview-section {
  margin-top: 40px;
}

.preview-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 15px;
}

.preview-header {
  padding: 20px;
  color: white;
}

.preview-content {
  display: flex;
  min-height: 200px;
}

.preview-sidebar {
  flex: 0 0 200px;
  padding: 20px;
  color: white;
}

.preview-main {
  flex: 1;
  padding: 20px;
}

.preview-card {
  padding: 20px;
  border-radius: 8px;
  min-height: 100px;
}

.preview-btn {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.preview-footer {
  padding: 15px;
  color: white;
  text-align: center;
}
</style>