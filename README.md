# Darija Dictionary - قاموس الدارجة المغربية

Ein modernes, interaktives Wörterbuch für marokkanisches Arabisch (Darija) mit leistungsstarker Fuzzy-Search-Funktionalität.

## 🌟 Features

### 🔍 Intelligente Suche
- **Fuzzy Search**: Findet Wörter auch bei Tippfehlern oder unvollständigen Eingaben
- **Mehrsprachige Suche**: Suche in Darija (Latein), Arabisch, Englisch und Deutsch
- **Sprachfilter**: Filtere nach spezifischen Sprachen für präzisere Ergebnisse
- **Anpassbare Sensitivität**: Stelle die Suchgenauigkeit nach deinen Bedürfnissen ein

### 🎨 Moderne Benutzeroberfläche
- **Responsive Design**: Funktioniert perfekt auf Desktop, Tablet und Smartphone
- **Dark Mode**: Automatische Anpassung an deine Systemeinstellungen
- **Arabische Schriftart**: Optimierte Darstellung arabischer Texte
- **Intuitive Navigation**: Benutzerfreundliche Bedienung

### 📚 Wörterbuchfunktionen
- **Vollständige Übersetzungen**: Jeder Eintrag enthält alle vier Sprachen
- **Wortklassen**: Grammatikalische Kategorisierung der Wörter
- **Kartenansicht**: Übersichtliche Darstellung aller Informationen
- **Erweiterbar**: Einfache Hinzufügung neuer Einträge

## 🚀 Technologie

- **Next.js 15**: Moderne React-Framework
- **TypeScript**: Typsichere Entwicklung
- **Tailwind CSS**: Utility-first CSS Framework
- **Fuse.js**: Leistungsstarke Fuzzy-Search-Library
- **Noto Naskh Arabic**: Optimierte arabische Schriftart

## 📦 Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/your-username/darija-dictionary.git
   cd darija-dictionary
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

4. **Im Browser öffnen**: [http://localhost:3000](http://localhost:3000)

## 🔧 Konfiguration

### Wörterbuchdaten erweitern

Füge neue Einträge in `src/data/dictionary.ts` hinzu:

```typescript
{
  n1: "neuesWort",
  darija_ar: "كلمة جديدة",
  eng: "new word",
  de: "neues Wort",
  class: "noun"
}
```

### Suchparameter anpassen

Die Fuzzy-Search-Parameter können in `src/utils/search.ts` angepasst werden:

```typescript
const fuseOptions = {
  threshold: 0.3,        // Suchgenauigkeit (0.0 = exakt, 1.0 = sehr locker)
  distance: 100,         // Maximale Zeichenentfernung
  minMatchCharLength: 2, // Minimale Übereinstimmungslänge
  // ... weitere Optionen
};
```

## 📖 Verwendung

### Grundlegende Suche
1. Gib ein Wort in die Suchleiste ein
2. Die Ergebnisse werden automatisch gefiltert
3. Verwende die Sprachfilter für präzisere Suche

### Erweiterte Suche
- **Sensitivität anpassen**: Verwende den Schieberegler für verschiedene Suchgenauigkeiten
- **Sprachfilter**: Klicke auf die Sprachbuttons für fokussierte Suche
- **Fuzzy Search**: Die Suche findet auch ähnliche Wörter bei Tippfehlern

### Tastenkombinationen
- `Ctrl/Cmd + K`: Fokus auf Suchleiste
- `Escape`: Suchleiste leeren
- `Enter`: Erste Suche ausführen

## 🎯 Suchbeispiele

| Eingabe | Findet |
|---------|--------|
| `musik` | `moSi9a` (Musik) |
| `music` | `moSi9a` (Musik) |
| `موسيقا` | `moSi9a` (Musik) |
| `art` | `fenn` (Kunst) |
| `kult` | `ta9afa` (Kultur) |

## 🔄 Erweiterte Funktionen

### Batch-Import
Für große Datenmengen können CSV-Dateien importiert werden:

```typescript
// Beispiel für CSV-Import-Funktion
import { importFromCSV } from './utils/import';

const newEntries = await importFromCSV('dictionary-data.csv');
```

### API-Integration
Das Wörterbuch kann als API verwendet werden:

```typescript
// Beispiel für API-Endpoint
GET /api/search?q=musik&lang=all&threshold=0.3
```

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- **Fuse.js**: Für die leistungsstarke Fuzzy-Search-Funktionalität
- **Google Fonts**: Für die Noto Naskh Arabic Schriftart
- **Tailwind CSS**: Für das moderne CSS-Framework
- **Next.js Team**: Für das großartige React-Framework

## 📞 Support

Bei Fragen oder Problemen:
- Erstelle ein Issue auf GitHub
- Kontaktiere uns über [email@example.com](mailto:email@example.com)
- Besuche unsere [Dokumentation](https://docs.example.com)

---

**Entwickelt mit ❤️ für die marokkanische Sprachgemeinschaft**
