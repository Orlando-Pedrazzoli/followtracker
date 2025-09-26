import {
  InstagramUser,
  UserData,
  StringListData,
  InstagramDataComplete,
  CompleteAnalysis,
  Alert,
  HistoricalAnalysis,
  AnalysisComparison,
  TimelineEvent,
} from '@/types/instagram';

/**
 * Parser Universal para arquivos do Instagram
 * Detecta automaticamente o tipo de arquivo e extrai os dados
 */
export class InstagramDataParser {
  /**
   * Converte UserData do Instagram para InstagramUser padronizado
   */
  private static normalizeUser(userData: UserData): InstagramUser[] {
    if (!userData) return [];

    const stringListData = userData.string_list_data || [];

    return stringListData.map((item: StringListData) => ({
      username: item.value,
      timestamp: item.timestamp,
      href: item.href,
    }));
  }

  /**
   * Detecta o tipo de arquivo baseado no conteúdo e nome
   * MELHORADO: Suporta arquivos em subpastas do ZIP
   */
  private static detectFileType(
    fileName: string,
    content: any
  ): keyof InstagramDataComplete | null {
    // Pegar apenas o nome do arquivo sem o caminho
    const baseFileName = fileName.split('/').pop() || '';
    const lowerFileName = baseFileName.toLowerCase();

    // Mapear nome do arquivo para tipo - ordem importa!
    const fileTypeMap: Record<string, keyof InstagramDataComplete> = {
      followers_1: 'followers', // Arquivo específico followers_1.json
      followers: 'followers',
      following: 'following',
      close_friends: 'closeFriends',
      blocked_profiles: 'blockedProfiles',
      recently_unfollowed: 'recentlyUnfollowed',
      follow_requests_you: 'followRequestsReceived', // follow_requests_you've_received
      pending_follow_requests: 'pendingFollowRequests',
      recent_follow_requests: 'recentFollowRequests',
      hide_story_from: 'hideStoryFrom',
      following_hashtags: 'followingHashtags',
      restricted_profiles: 'restrictedProfiles',
      removed_suggestions: 'removedSuggestions',
    };

    // Verificar por nome de arquivo
    for (const [key, value] of Object.entries(fileTypeMap)) {
      if (lowerFileName.includes(key)) {
        console.log(`Arquivo detectado: ${baseFileName} -> ${value}`);
        return value;
      }
    }

    // Verificar por chaves no conteúdo JSON
    const contentKeys = Object.keys(content);
    for (const key of contentKeys) {
      const lowerKey = key.toLowerCase();
      // Procurar por chaves específicas do Instagram
      if (
        lowerKey.includes('relationships_followers') ||
        key === 'followers_1'
      ) {
        return 'followers';
      }
      if (lowerKey.includes('relationships_following') || key === 'following') {
        return 'following';
      }
      if (lowerKey.includes('relationships_unfollowed_users')) {
        return 'recentlyUnfollowed';
      }
      if (lowerKey.includes('relationships_follow_requests_received')) {
        return 'followRequestsReceived';
      }
      if (lowerKey.includes('relationships_close_friends')) {
        return 'closeFriends';
      }
      if (lowerKey.includes('relationships_blocked_users')) {
        return 'blockedProfiles';
      }
      if (lowerKey.includes('relationships_restricted_users')) {
        return 'restrictedProfiles';
      }
      if (lowerKey.includes('relationships_hide_stories_from')) {
        return 'hideStoryFrom';
      }
    }

    console.warn(`Tipo de arquivo não reconhecido: ${baseFileName}`);
    return null;
  }

  /**
   * Processa um arquivo JSON individual
   */
  static parseFile(
    fileName: string,
    content: string
  ): {
    type: keyof InstagramDataComplete | null;
    data: InstagramUser[] | string[];
  } {
    try {
      const jsonData = JSON.parse(content);
      const fileType = this.detectFileType(fileName, jsonData);

      if (!fileType) {
        console.warn(`Tipo de arquivo não reconhecido: ${fileName}`);
        return { type: null, data: [] };
      }

      // Processar hashtags de forma diferente
      if (fileType === 'followingHashtags') {
        const hashtags = this.extractHashtags(jsonData);
        return { type: fileType, data: hashtags };
      }

      // Processar outros arquivos normalmente
      const users = this.extractUsers(jsonData);
      return { type: fileType, data: users };
    } catch (error) {
      console.error(`Erro ao processar arquivo ${fileName}:`, error);
      return { type: null, data: [] };
    }
  }

  /**
   * Extrai usuários de qualquer formato do Instagram
   * MELHORADO: Suporta mais formatos
   */
  private static extractUsers(jsonData: any): InstagramUser[] {
    let users: InstagramUser[] = [];

    // Se for um array direto (followers_1.json, etc)
    if (Array.isArray(jsonData)) {
      for (const item of jsonData) {
        if (item.string_list_data) {
          users.push(...this.normalizeUser(item));
        }
      }
      return users;
    }

    // Procurar por chaves conhecidas - EXPANDIDO
    const possibleKeys = [
      'relationships_followers',
      'relationships_following',
      'relationships_close_friends',
      'relationships_blocked_users',
      'relationships_unfollowed_users',
      'relationships_follow_requests_received',
      'relationships_follow_requests_sent',
      'relationships_recent_follow_requests',
      'relationships_hide_stories_from',
      'relationships_restricted_users',
      'followers',
      'followers_1', // Novo formato
      'following',
      'close_friends',
      'blocked_profiles',
      'recently_unfollowed_profiles',
      'unfollowed_users',
      'follow_requests_youve_received',
      'pending_follow_requests',
      'recent_follow_requests',
      'hide_story_from',
      'restricted_profiles',
      'removed_suggestions',
    ];

    for (const key of possibleKeys) {
      if (jsonData[key]) {
        const data = jsonData[key];
        if (Array.isArray(data)) {
          for (const item of data) {
            users.push(...this.normalizeUser(item));
          }
        }
        break;
      }
    }

    return users;
  }

  /**
   * Extrai hashtags do arquivo following_hashtags
   */
  private static extractHashtags(jsonData: any): string[] {
    const hashtags: string[] = [];

    if (jsonData.following_hashtags) {
      for (const item of jsonData.following_hashtags) {
        if (item.string_list_data) {
          for (const hashtag of item.string_list_data) {
            hashtags.push(hashtag.value);
          }
        }
      }
    } else if (jsonData.relationships_following_hashtags) {
      for (const item of jsonData.relationships_following_hashtags) {
        if (item.string_list_data) {
          for (const hashtag of item.string_list_data) {
            hashtags.push(hashtag.value);
          }
        }
      }
    }

    return hashtags;
  }

  /**
   * Processa múltiplos arquivos e retorna dados completos
   * MELHORADO: Melhor processamento de arquivos do ZIP
   */
  static parseMultipleFiles(
    files: { name: string; content: string }[]
  ): InstagramDataComplete {
    const result: InstagramDataComplete = {
      followers: [],
      following: [],
      closeFriends: [],
      blockedProfiles: [],
      recentlyUnfollowed: [],
      followRequestsReceived: [],
      pendingFollowRequests: [],
      recentFollowRequests: [],
      hideStoryFrom: [],
      followingHashtags: [],
      restrictedProfiles: [],
      removedSuggestions: [],
    };

    console.log(`Processando ${files.length} arquivos...`);

    for (const file of files) {
      const { type, data } = this.parseFile(file.name, file.content);

      if (type && data.length > 0) {
        if (type === 'followingHashtags') {
          result[type] = data as string[];
        } else {
          result[type] = data as InstagramUser[];
        }
        console.log(`✅ ${type}: ${data.length} registros`);
      }
    }

    return result;
  }
}

/**
 * Analisador de dados do Instagram
 * Gera todas as estatísticas, categorias e insights
 */
export class InstagramAnalyzer {
  /**
   * Gera análise completa dos dados
   */
  static analyze(data: InstagramDataComplete): CompleteAnalysis {
    const stats = this.calculateStats(data);
    const relationships = this.categorizeRelationships(data);

    // MELHORADO: Detectar bloqueios com análise histórica
    const previousAnalysis = HistoryManager.getLatestAnalysis();
    if (previousAnalysis) {
      relationships.suspicious = this.detectPossibleBlocks(
        relationships.notFollowingBack,
        data.recentlyUnfollowed,
        data.followRequestsReceived,
        previousAnalysis.analysis
      );
    }

    const socialHealth = this.calculateSocialHealth(data, stats, relationships);
    const insights = this.generateInsights(data, relationships);
    const alerts = this.generateAlerts(data, stats, relationships);

    return {
      basicData: data,
      stats,
      relationships,
      socialHealth: {
        ...socialHealth,
        alerts,
      },
      insights,
      metadata: {
        analyzedAt: new Date().toISOString(),
        version: '2.0.0',
        filesProcessed: Object.keys(data).filter(
          key =>
            Array.isArray(data[key as keyof InstagramDataComplete]) &&
            (data[key as keyof InstagramDataComplete] as any[]).length > 0
        ),
      },
    };
  }

  /**
   * Calcula estatísticas básicas
   */
  private static calculateStats(data: InstagramDataComplete) {
    const totalFollowers = data.followers.length;
    const totalFollowing = data.following.length;

    const followersSet = new Set(data.followers.map(u => u.username));
    const followingSet = new Set(data.following.map(u => u.username));

    const mutualCount = data.followers.filter(u =>
      followingSet.has(u.username)
    ).length;
    const notFollowingBackCount = data.following.filter(
      u => !followersSet.has(u.username)
    ).length;
    const notFollowedBackCount = data.followers.filter(
      u => !followingSet.has(u.username)
    ).length;

    return {
      totalFollowers,
      totalFollowing,
      mutualCount,
      notFollowingBackCount,
      notFollowedBackCount,
      engagementRatio:
        totalFollowers > 0 ? (mutualCount / totalFollowers) * 100 : 0,
      closeFriendsCount: data.closeFriends.length,
      blockedCount: data.blockedProfiles.length,
      restrictedCount: data.restrictedProfiles.length,
      hideStoryCount: data.hideStoryFrom.length,
    };
  }

  /**
   * Categoriza relacionamentos
   */
  private static categorizeRelationships(data: InstagramDataComplete) {
    const followersSet = new Set(data.followers.map(u => u.username));
    const followingSet = new Set(data.following.map(u => u.username));
    const closeFriendsSet = new Set(data.closeFriends.map(u => u.username));
    const recentUnfollowSet = new Set(
      data.recentlyUnfollowed.map(u => u.username)
    );

    // Categorias básicas - PRINCIPAL: notFollowingBack
    const mutual = data.followers.filter(u => followingSet.has(u.username));
    const notFollowingBack = data.following.filter(
      u => !followersSet.has(u.username)
    );
    const notFollowedBack = data.followers.filter(
      u => !followingSet.has(u.username)
    );

    // Categorias avançadas
    const vips = mutual.filter(u => closeFriendsSet.has(u.username));
    const redFlags = data.closeFriends.filter(
      u => !followersSet.has(u.username)
    );
    const fans = notFollowedBack;
    const crushes = notFollowingBack;
    const ghosts = data.recentlyUnfollowed;
    const stalkers = [
      ...data.followRequestsReceived,
      ...data.pendingFollowRequests,
    ];
    const suspicious: InstagramUser[] = []; // Será preenchido com comparação histórica

    return {
      mutual,
      notFollowingBack, // PRINCIPAL - quem não te segue de volta
      notFollowedBack,
      vips,
      redFlags,
      fans,
      crushes,
      ghosts,
      stalkers,
      suspicious,
    };
  }

  /**
   * NOVO: Detector avançado de possíveis bloqueios
   */
  private static detectPossibleBlocks(
    notFollowingBack: InstagramUser[],
    recentUnfollows: InstagramUser[],
    followRequests: InstagramUser[],
    previousAnalysis?: CompleteAnalysis
  ): InstagramUser[] {
    const blocks: InstagramUser[] = [];
    const unfollowSet = new Set(recentUnfollows.map(u => u.username));
    const requestSet = new Set(followRequests.map(u => u.username));

    // Análise histórica se disponível
    const previousMutuals =
      previousAnalysis?.relationships.mutual.map(u => u.username) || [];
    const previousFollowers =
      previousAnalysis?.basicData.followers.map(u => u.username) || [];

    for (const user of notFollowingBack) {
      let blockProbability = 0;

      // Não está na lista de unfollows recentes = possível bloqueio
      if (!unfollowSet.has(user.username)) {
        blockProbability += 40;
      }

      // Se você tinha solicitação pendente e sumiu
      if (requestSet.has(user.username)) {
        blockProbability += 30;
      }

      // Se era mútuo antes e agora não é
      if (previousMutuals.includes(user.username)) {
        blockProbability += 50;
      }

      // Se era seguidor antes e sumiu sem estar nos unfollows
      if (
        previousFollowers.includes(user.username) &&
        !unfollowSet.has(user.username)
      ) {
        blockProbability += 60;
      }

      // Se seguia há muito tempo (timestamp antigo)
      if (user.timestamp) {
        const daysAgo = (Date.now() / 1000 - user.timestamp) / 86400;
        if (daysAgo > 180) {
          // Mais de 6 meses
          blockProbability += 20;
        }
      }

      // Se tem alta probabilidade, adicionar à lista
      if (blockProbability >= 60) {
        blocks.push(user);
      }
    }

    return blocks;
  }

  /**
   * Calcula score de saúde social
   */
  private static calculateSocialHealth(
    data: InstagramDataComplete,
    stats: any,
    relationships: any
  ) {
    // Calcular scores individuais
    const reciprocityScore = Math.min(
      100,
      (stats.mutualCount / Math.max(stats.totalFollowing, 1)) * 100
    );

    const privacyScore = Math.max(
      0,
      100 -
        (stats.blockedCount * 2 +
          stats.restrictedCount * 1.5 +
          stats.hideStoryCount * 1)
    );

    const engagementScore = stats.engagementRatio;

    const qualityScore = Math.min(
      100,
      relationships.vips.length * 10 +
        relationships.mutual.length * 2 -
        relationships.redFlags.length * 5 -
        relationships.ghosts.length * 3
    );

    const overallScore =
      reciprocityScore * 0.3 +
      privacyScore * 0.2 +
      engagementScore * 0.3 +
      qualityScore * 0.2;

    // Gerar recomendações
    const recommendations: string[] = [];

    if (stats.notFollowingBackCount > 50) {
      recommendations.push(
        `🚫 Você tem ${stats.notFollowingBackCount} pessoas que não te seguem de volta. Considere deixar de segui-las para melhorar seu ratio.`
      );
    }
    if (reciprocityScore < 30) {
      recommendations.push(
        'Considere deixar de seguir perfis que não te seguem de volta'
      );
    }
    if (relationships.redFlags.length > 0) {
      recommendations.push(
        'Revise sua lista de amigos próximos - alguns não te seguem'
      );
    }
    if (stats.totalFollowing > stats.totalFollowers * 2) {
      recommendations.push('Seu ratio seguindo/seguidores está desequilibrado');
    }
    if (relationships.ghosts.length > 10) {
      recommendations.push(
        'Muitas pessoas deram unfollow recentemente - avalie seu conteúdo'
      );
    }
    if (relationships.suspicious.length > 0) {
      recommendations.push(
        `⚠️ ${relationships.suspicious.length} possíveis bloqueios detectados. Verifique esses perfis.`
      );
    }

    return {
      overallScore,
      reciprocityScore,
      privacyScore,
      engagementScore,
      qualityScore,
      recommendations,
      alerts: [], // Será preenchido separadamente
    };
  }

  /**
   * Gera insights e tendências
   */
  private static generateInsights(
    data: InstagramDataComplete,
    relationships: any
  ) {
    const growthRate = 0; // Será calculado com histórico
    const unfollowRate = data.recentlyUnfollowed.length;

    // Top interações (baseado em mútuos e close friends)
    const topInteractions = relationships.vips.slice(0, 10);

    // Perfis de risco (não te seguem mas você segue há muito tempo)
    const riskProfiles = relationships.notFollowingBack
      .filter(
        (u: InstagramUser) =>
          u.timestamp && u.timestamp < Date.now() / 1000 - 86400 * 30
      )
      .slice(0, 20);

    return {
      growthRate,
      unfollowRate,
      newFollowersCount: 0, // Será calculado com histórico
      lostFollowersCount: data.recentlyUnfollowed.length,
      topInteractions,
      riskProfiles,
    };
  }

  /**
   * Gera alertas baseados na análise
   */
  private static generateAlerts(
    data: InstagramDataComplete,
    stats: any,
    relationships: any
  ): Alert[] {
    const alerts: Alert[] = [];

    // ALERTA PRINCIPAL: Quem não te segue de volta
    if (stats.notFollowingBackCount > 0) {
      alerts.push({
        type: 'danger',
        title: `${stats.notFollowingBackCount} pessoas não te seguem de volta`,
        message: `Você segue ${stats.notFollowingBackCount} pessoas que não te seguem. Considere deixar de segui-las.`,
        category: 'unfollowers',
        priority: 1,
      });
    }

    // Possíveis bloqueios
    if (relationships.suspicious.length > 0) {
      alerts.push({
        type: 'warning',
        title: 'Possíveis bloqueios detectados',
        message: `${relationships.suspicious.length} perfis podem ter te bloqueado`,
        category: 'blocks',
        priority: 2,
      });
    }

    // Alertas de perigo
    if (relationships.redFlags.length > 0) {
      alerts.push({
        type: 'danger',
        title: 'Amigos próximos não recíprocos',
        message: `${relationships.redFlags.length} pessoas na sua lista de amigos próximos não te seguem`,
        category: 'privacy',
        priority: 3,
      });
    }

    if (data.recentlyUnfollowed.length > 20) {
      alerts.push({
        type: 'warning',
        title: 'Taxa alta de unfollow',
        message: `${data.recentlyUnfollowed.length} pessoas deixaram de te seguir recentemente`,
        category: 'engagement',
        priority: 4,
      });
    }

    // Alertas de aviso
    if (stats.totalFollowing > stats.totalFollowers * 1.5) {
      alerts.push({
        type: 'warning',
        title: 'Ratio desequilibrado',
        message: 'Você segue muito mais pessoas do que te seguem',
        category: 'balance',
        priority: 5,
      });
    }

    // Alertas informativos
    if (relationships.vips.length > 0) {
      alerts.push({
        type: 'success',
        title: 'VIPs identificados',
        message: `${relationships.vips.length} seguidores mútuos estão nos seus amigos próximos`,
        category: 'social',
        priority: 6,
      });
    }

    if (data.followRequestsReceived.length > 0) {
      alerts.push({
        type: 'info',
        title: 'Solicitações pendentes',
        message: `Você tem ${data.followRequestsReceived.length} solicitações de seguidor aguardando`,
        category: 'pending',
        priority: 7,
      });
    }

    return alerts.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Compara duas análises para detectar mudanças
   */
  static compareAnalyses(
    previous: HistoricalAnalysis,
    current: HistoricalAnalysis
  ): AnalysisComparison {
    const prevFollowers = new Set(
      previous.analysis.basicData.followers.map(u => u.username)
    );
    const currFollowers = new Set(
      current.analysis.basicData.followers.map(u => u.username)
    );

    const prevFollowing = new Set(
      previous.analysis.basicData.following.map(u => u.username)
    );
    const currFollowing = new Set(
      current.analysis.basicData.following.map(u => u.username)
    );

    const prevUnfollowed = new Set(
      previous.analysis.basicData.recentlyUnfollowed.map(u => u.username)
    );

    // Detectar mudanças
    const newFollowers = current.analysis.basicData.followers.filter(
      u => !prevFollowers.has(u.username)
    );
    const lostFollowers = previous.analysis.basicData.followers.filter(
      u => !currFollowers.has(u.username)
    );

    // DETECÇÃO DE BLOQUEIOS MELHORADA
    const possibleBlocks = lostFollowers.filter(
      u => !prevUnfollowed.has(u.username)
    );

    // Mudanças em mútuos
    const prevMutuals = new Set(
      previous.analysis.relationships.mutual.map(u => u.username)
    );
    const currMutuals = new Set(
      current.analysis.relationships.mutual.map(u => u.username)
    );

    const newMutuals = current.analysis.relationships.mutual.filter(
      u => !prevMutuals.has(u.username)
    );
    const lostMutuals = previous.analysis.relationships.mutual.filter(
      u => !currMutuals.has(u.username)
    );

    // Mudanças em close friends
    const prevCloseFriends = new Set(
      previous.analysis.basicData.closeFriends.map(u => u.username)
    );
    const currCloseFriends = new Set(
      current.analysis.basicData.closeFriends.map(u => u.username)
    );

    const newCloseFriends = current.analysis.basicData.closeFriends.filter(
      u => !prevCloseFriends.has(u.username)
    );
    const removedCloseFriends = previous.analysis.basicData.closeFriends.filter(
      u => !currCloseFriends.has(u.username)
    );

    // Novos bloqueios e restrições
    const prevBlocked = new Set(
      previous.analysis.basicData.blockedProfiles.map(u => u.username)
    );
    const newBlocks = current.analysis.basicData.blockedProfiles.filter(
      u => !prevBlocked.has(u.username)
    );

    const prevRestricted = new Set(
      previous.analysis.basicData.restrictedProfiles.map(u => u.username)
    );
    const newRestrictions =
      current.analysis.basicData.restrictedProfiles.filter(
        u => !prevRestricted.has(u.username)
      );

    // Gerar timeline de eventos
    const timeline: TimelineEvent[] = [];

    newFollowers.forEach(user => {
      timeline.push({
        type: 'follow',
        user,
        timestamp: current.timestamp,
        description: `@${user.username} começou a te seguir`,
      });
    });

    lostFollowers.forEach(user => {
      timeline.push({
        type: 'unfollow',
        user,
        timestamp: current.timestamp,
        description: `@${user.username} deixou de te seguir`,
      });
    });

    possibleBlocks.forEach(user => {
      timeline.push({
        type: 'block',
        user,
        timestamp: current.timestamp,
        description: `@${user.username} possivelmente te bloqueou`,
      });
    });

    // Ordenar timeline por timestamp
    timeline.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return {
      previousAnalysis: previous,
      currentAnalysis: current,
      changes: {
        newFollowers,
        lostFollowers,
        possibleBlocks,
        newMutuals,
        lostMutuals,
        newCloseFriends,
        removedCloseFriends,
        newBlocks,
        newRestrictions,
      },
      timeline,
    };
  }
}

/**
 * Gerenciador de histórico de análises
 */
export class HistoryManager {
  private static STORAGE_KEY = 'instagram-analysis-history';
  private static MAX_HISTORY = 10;

  /**
   * Salva uma análise no histórico
   */
  static saveAnalysis(analysis: CompleteAnalysis, label?: string): string {
    const history = this.getHistory();

    const id = `analysis-${Date.now()}`;
    const historicalAnalysis: HistoricalAnalysis = {
      id,
      analysis,
      timestamp: new Date().toISOString(),
      label: label || `Análise ${new Date().toLocaleDateString('pt-BR')}`,
    };

    history.unshift(historicalAnalysis);

    // Manter apenas as últimas MAX_HISTORY análises
    if (history.length > this.MAX_HISTORY) {
      history.pop();
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return id;
  }

  /**
   * Obtém o histórico de análises
   */
  static getHistory(): HistoricalAnalysis[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Obtém uma análise específica por ID
   */
  static getAnalysis(id: string): HistoricalAnalysis | null {
    const history = this.getHistory();
    return history.find(h => h.id === id) || null;
  }

  /**
   * Remove uma análise do histórico
   */
  static removeAnalysis(id: string): void {
    const history = this.getHistory();
    const filtered = history.filter(h => h.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  /**
   * Limpa todo o histórico
   */
  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Obtém a última análise
   */
  static getLatestAnalysis(): HistoricalAnalysis | null {
    const history = this.getHistory();
    return history.length > 0 ? history[0] : null;
  }

  /**
   * Compara a análise atual com a anterior
   */
  static compareWithPrevious(
    currentAnalysis: CompleteAnalysis
  ): AnalysisComparison | null {
    const history = this.getHistory();
    if (history.length < 2) return null;

    const current: HistoricalAnalysis = {
      id: 'current',
      analysis: currentAnalysis,
      timestamp: new Date().toISOString(),
    };

    return InstagramAnalyzer.compareAnalyses(history[1], current);
  }
}
