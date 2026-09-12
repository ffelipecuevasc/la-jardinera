const fs = require('fs');
const path = require('path');

// Target directory (root by default)
const dir = '.';

// Extension to look for
const ext = '.html';

// Icon library path
const svgDirOutlined = path.join('node_modules', '@material-design-icons', 'svg', 'outlined');
const svgDirFilled = path.join('node_modules', '@material-design-icons', 'svg', 'filled');

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove Google fonts tag for Material Symbols
    content = content.replace(/<link[^>]+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined[^>]*>\s*/g, '');

    const regex = /<span([^>]*)class="([^"]*)"([^>]*)>(.*?)<\/span>/gi;
    
    let changed = false;
    content = content.replace(regex, (match, beforeClass, classes, afterClass, innerText) => {
        if (!classes.includes('material-symbols-outlined')) return match;
        
        let iconName = innerText.trim();
        if (!iconName) return match;
        
        // Let's resolve standard aliases we handled previously
        if(iconName === 'potted_plant' || iconName === 'eco') {
             iconName = 'spa';
        }
        
        let newClasses = classes.replace('material-symbols-outlined', '').trim();
        
        let svgPath = path.join(svgDirOutlined, iconName + '.svg');
        let svgContent = '';
        
        try {
            svgContent = fs.readFileSync(svgPath, 'utf8');
        } catch (e) {
            console.log(`[Warning] Could not find outlined SVG for: ${iconName}. Ensure @material-design-icons/svg is installed.`);
            return match; 
        }
        
        if (afterClass.includes("FILL' 1") || iconName === 'star') {
            const svgPathFilled = path.join(svgDirFilled, iconName + '.svg');
            try {
                svgContent = fs.readFileSync(svgPathFilled, 'utf8');
            } catch(e) {}
        }
        
        svgContent = svgContent.replace(/<svg\s+/, `<svg class="${newClasses}" fill="currentColor" `);
        svgContent = svgContent.replace(/<svg\s+/, `<svg ${beforeClass.trim()} ${afterClass.trim()} `);
        svgContent = svgContent.replace(/\s+/g, ' ');
        
        changed = true;
        return svgContent;
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed: ${filePath}`);
    }
};

fs.readdirSync(dir).forEach(file => {
    if (path.extname(file) === ext) {
        processFile(path.join(dir, file));
    }
});
