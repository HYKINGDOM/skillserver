/**
 * i18n 国际化配置文件
 * 支持中文和英文切换
 */

const i18n = {
    // 当前语言
    currentLang: localStorage.getItem('lang') || 'zh',
    
    // 语言配置
    languages: {
        zh: '中文',
        en: 'English'
    },
    
    // 翻译文本
    translations: {
        zh: {
            // 页面标题
            title: '技能服务器',
            
            // 按钮文本
            importSkill: '导入技能',
            gitRepos: 'Git仓库',
            newSkill: '新建技能',
            save: '保存',
            cancel: '取消',
            export: '导出',
            delete: '删除',
            upload: '上传',
            edit: '编辑',
            preview: '预览',
            add: '添加',
            sync: '同步',
            toggle: '切换',
            confirm: '确认',
            
            // 搜索相关
            searchPlaceholder: '搜索技能...',
            result: '结果',
            results: '结果',
            
            // 编辑器相关
            editSkill: '编辑技能',
            skillName: '技能名称 (必须与目录名匹配)',
            skillNamePlaceholder: 'skill-name (仅限小写字母、数字、连字符)',
            description: '描述',
            descriptionPlaceholder: '描述此技能的功能和使用场景 (1-1024个字符)',
            descriptionRequired: '必填: 1-1024个字符',
            license: '许可证 (可选)',
            licensePlaceholder: '例如: Apache-2.0',
            compatibility: '兼容性 (可选, 最多500字符)',
            compatibilityPlaceholder: '例如: 需要 git, docker, jq',
            content: '内容 (Markdown)',
            
            // 标签页
            contentTab: '内容',
            resourcesTab: '资源',
            
            // 资源相关
            scripts: '脚本',
            references: '参考文档',
            assets: '资源文件',
            noScripts: '暂无脚本',
            noReferences: '暂无参考文档',
            noAssets: '暂无资源文件',
            
            // 状态标签
            readOnly: '只读',
            enabled: '已启用',
            disabled: '已禁用',
            
            // 提示信息
            noSkillsFound: '未找到技能',
            createFirstSkill: '创建您的第一个技能开始使用!',
            createSkill: '创建技能',
            
            // Git仓库相关
            gitRepositories: 'Git仓库管理',
            addRepository: '添加仓库',
            repositoryUrl: '仓库URL',
            repositoryUrlPlaceholder: 'https://github.com/user/repo.git',
            noGitRepos: '暂无配置的Git仓库',
            editRepository: '编辑仓库',
            enableRepository: '启用仓库',
            disableRepository: '禁用仓库',
            syncRepository: '同步仓库',
            deleteRepository: '删除仓库',
            
            // 导入相关
            importSkillTitle: '导入技能',
            importSkillDesc: '上传技能归档文件 (.tar.gz) 以导入技能。',
            
            // 确认对话框
            confirmDelete: '确定要删除吗?',
            confirmDeleteResource: '确定要删除资源吗?',
            
            // Toast 提示信息
            skillSaved: '技能保存成功',
            skillDeleted: '技能删除成功',
            skillExported: '技能导出成功',
            skillImported: '技能导入成功',
            resourceUploaded: '资源上传成功',
            resourceUpdated: '资源更新成功',
            resourceDeleted: '资源删除成功',
            repoAdded: '仓库添加成功',
            repoUpdated: '仓库更新成功',
            repoDeleted: '仓库删除成功',
            repoSynced: '仓库同步成功',
            repoToggled: '仓库状态切换成功',
            
            // 错误信息
            failedToLoadSkills: '加载技能失败',
            failedToSave: '保存失败',
            failedToDelete: '删除失败',
            failedToExport: '导出失败',
            failedToImport: '导入失败',
            failedToUpload: '上传失败',
            failedToUpdate: '更新失败',
            failedToLoadResource: '加载资源失败',
            failedToAddRepo: '添加仓库失败',
            failedToUpdateRepo: '更新仓库失败',
            failedToDeleteRepo: '删除仓库失败',
            failedToSyncRepo: '同步仓库失败',
            failedToToggleRepo: '切换仓库状态失败',
            searchFailed: '搜索失败',
            
            // 验证信息
            skillNameRequired: '技能名称为必填项',
            skillNameLength: '技能名称长度必须为1-64个字符',
            skillNameHyphen: '技能名称不能以连字符开头或结尾',
            skillNameConsecutiveHyphens: '技能名称不能包含连续的连字符',
            skillNameInvalidChars: '技能名称只能包含小写字母、数字和连字符',
            descriptionRequired: '描述为必填项',
            descriptionLength: '描述长度必须为1-1024个字符',
            compatibilityLength: '兼容性长度最多500个字符',
            repoUrlRequired: '仓库URL为必填项',
            repoUrlInvalid: 'URL格式无效',
            repoAlreadyExists: '仓库已存在',
            cannotUpdateReadOnly: '无法更新: 此技能为只读',
            cannotDeleteReadOnly: '无法删除: 此技能为只读',
            cannotCreateInReadOnly: '无法在只读技能中创建资源',
            cannotUpdateInReadOnly: '无法更新只读技能中的资源',
            cannotDeleteFromReadOnly: '无法删除只读技能中的资源',
            cannotSyncDisabled: '无法同步已禁用的仓库',
            pleaseSelectFile: '请选择 .tar.gz 文件',
            fileTooLarge: '文件过大',
            
            // 其他
            noContentToPreview: '无内容可预览',
            readOnlyWarning: '只读: 此技能来自Git仓库, 无法编辑。',
            toggleTheme: '切换主题',
            switchLanguage: '切换语言'
        },
        
        en: {
            // Page title
            title: 'SkillServer',
            
            // Button text
            importSkill: 'Import Skill',
            gitRepos: 'Git Repos',
            newSkill: 'New Skill',
            save: 'Save',
            cancel: 'Cancel',
            export: 'Export',
            delete: 'Delete',
            upload: 'Upload',
            edit: 'Edit',
            preview: 'Preview',
            add: 'Add',
            sync: 'Sync',
            toggle: 'Toggle',
            confirm: 'Confirm',
            
            // Search related
            searchPlaceholder: 'Search skills...',
            result: 'result',
            results: 'results',
            
            // Editor related
            editSkill: 'Edit Skill',
            skillName: 'Skill Name (must match directory name)',
            skillNamePlaceholder: 'skill-name (lowercase, numbers, hyphens only)',
            description: 'Description',
            descriptionPlaceholder: 'A description of what this skill does and when to use it (1-1024 characters)',
            descriptionRequired: 'Required: 1-1024 characters',
            license: 'License (optional)',
            licensePlaceholder: 'e.g., Apache-2.0',
            compatibility: 'Compatibility (optional, max 500 chars)',
            compatibilityPlaceholder: 'e.g., Requires git, docker, jq',
            content: 'Content (Markdown)',
            
            // Tabs
            contentTab: 'Content',
            resourcesTab: 'Resources',
            
            // Resources related
            scripts: 'Scripts',
            references: 'References',
            assets: 'Assets',
            noScripts: 'No scripts',
            noReferences: 'No references',
            noAssets: 'No assets',
            
            // Status badges
            readOnly: 'Read-only',
            enabled: 'Enabled',
            disabled: 'Disabled',
            
            // Messages
            noSkillsFound: 'No skills found',
            createFirstSkill: 'Create your first skill to get started!',
            createSkill: 'Create Skill',
            
            // Git repository related
            gitRepositories: 'Git Repositories',
            addRepository: 'Add Repository',
            repositoryUrl: 'Repository URL',
            repositoryUrlPlaceholder: 'https://github.com/user/repo.git',
            noGitRepos: 'No git repositories configured',
            editRepository: 'Edit Repository',
            enableRepository: 'Enable repository',
            disableRepository: 'Disable repository',
            syncRepository: 'Sync repository',
            deleteRepository: 'Delete repository',
            
            // Import related
            importSkillTitle: 'Import Skill',
            importSkillDesc: 'Upload a skill archive file (.tar.gz) to import a skill.',
            
            // Confirm dialog
            confirmDelete: 'Are you sure you want to delete?',
            confirmDeleteResource: 'Are you sure you want to delete this resource?',
            
            // Toast messages
            skillSaved: 'Skill saved successfully',
            skillDeleted: 'Skill deleted successfully',
            skillExported: 'Skill exported successfully',
            skillImported: 'Skill imported successfully',
            resourceUploaded: 'Resource uploaded successfully',
            resourceUpdated: 'Resource updated successfully',
            resourceDeleted: 'Resource deleted successfully',
            repoAdded: 'Repository added successfully',
            repoUpdated: 'Repository updated successfully',
            repoDeleted: 'Repository deleted successfully',
            repoSynced: 'Repository synced successfully',
            repoToggled: 'Repository toggled successfully',
            
            // Error messages
            failedToLoadSkills: 'Failed to load skills',
            failedToSave: 'Failed to save',
            failedToDelete: 'Failed to delete',
            failedToExport: 'Failed to export',
            failedToImport: 'Failed to import',
            failedToUpload: 'Failed to upload',
            failedToUpdate: 'Failed to update',
            failedToLoadResource: 'Failed to load resource',
            failedToAddRepo: 'Failed to add repository',
            failedToUpdateRepo: 'Failed to update repository',
            failedToDeleteRepo: 'Failed to delete repository',
            failedToSyncRepo: 'Failed to sync repository',
            failedToToggleRepo: 'Failed to toggle repository',
            searchFailed: 'Search failed',
            
            // Validation messages
            skillNameRequired: 'Skill name is required',
            skillNameLength: 'Skill name must be 1-64 characters',
            skillNameHyphen: 'Skill name cannot start or end with a hyphen',
            skillNameConsecutiveHyphens: 'Skill name cannot contain consecutive hyphens',
            skillNameInvalidChars: 'Skill name may only contain lowercase letters, numbers, and hyphens',
            descriptionRequired: 'Description is required',
            descriptionLength: 'Description must be 1-1024 characters',
            compatibilityLength: 'Compatibility must be max 500 characters',
            repoUrlRequired: 'Repository URL is required',
            repoUrlInvalid: 'Invalid URL format',
            repoAlreadyExists: 'Repository already exists',
            cannotUpdateReadOnly: 'Cannot save: This skill is read-only',
            cannotDeleteReadOnly: 'Cannot delete: This skill is read-only',
            cannotCreateInReadOnly: 'Cannot create resources in read-only skill',
            cannotUpdateInReadOnly: 'Cannot update resources in read-only skill',
            cannotDeleteFromReadOnly: 'Cannot delete resources from read-only skill',
            cannotSyncDisabled: 'Cannot sync disabled repository',
            pleaseSelectFile: 'Please select a .tar.gz file',
            fileTooLarge: 'File too large',
            
            // Others
            noContentToPreview: 'No content to preview',
            readOnlyWarning: 'Read-only: This skill is from a git repository and cannot be edited.',
            toggleTheme: 'Toggle theme',
            switchLanguage: 'Switch language'
        }
    },
    
    /**
     * 获取当前语言
     */
    getLang() {
        return this.currentLang;
    },
    
    /**
     * 设置语言
     */
    setLang(lang) {
        if (this.languages[lang]) {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            // 触发语言变更事件
            window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
        }
    },
    
    /**
     * 切换语言
     */
    toggleLang() {
        const newLang = this.currentLang === 'zh' ? 'en' : 'zh';
        this.setLang(newLang);
        return newLang;
    },
    
    /**
     * 获取翻译文本
     */
    t(key) {
        const translation = this.translations[this.currentLang];
        if (translation && translation[key]) {
            return translation[key];
        }
        // 如果找不到翻译，返回 key 本身
        return key;
    },
    
    /**
     * 获取所有语言列表
     */
    getLanguages() {
        return Object.keys(this.languages).map(code => ({
            code,
            name: this.languages[code]
        }));
    }
};

// 导出 i18n 对象
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
