// Tipos completos para todos os dados do Instagram

// Estrutura base de um usuário do Instagram
export interface InstagramUser {
  username: string;
  timestamp?: number;
  href?: string;
  value?: string;
}

// Estrutura do formato que o Instagram usa
export interface StringListData {
  href?: string;
  value: string;
  timestamp: number;
}

export interface UserData {
  title?: string;
  media_list_data?: any[];
  string_list_data?: StringListData[];
}

// 1. Seguidores
export interface FollowersData {
  relationships_followers?: UserData[];
  followers_1?: UserData[];
  followers?: UserData[];
}

// 2. Seguindo
export interface FollowingData {
  relationships_following?: UserData[];
  following?: UserData[];
}

// 3. Close Friends (Amigos Próximos)
export interface CloseFriendsData {
  relationships_close_friends?: UserData[];
  close_friends?: UserData[];
}

// 4. Perfis Bloqueados
export interface BlockedData {
  relationships_blocked_users?: UserData[];
  blocked_profiles?: UserData[];
}

// 5. Unfollows Recentes
export interface RecentUnfollowsData {
  relationships_unfollowed_users?: UserData[];
  recently_unfollowed_profiles?: UserData[];
  unfollowed_users?: UserData[];
}

// 6. Solicitações Recebidas
export interface FollowRequestsReceivedData {
  relationships_follow_requests_received?: UserData[];
  follow_requests_youve_received?: UserData[];
}

// 7. Solicitações Pendentes
export interface PendingRequestsData {
  relationships_follow_requests_sent?: UserData[];
  pending_follow_requests?: UserData[];
}

// 8. Solicitações Recentes
export interface RecentFollowRequestsData {
  recent_follow_requests?: UserData[];
  relationships_recent_follow_requests?: UserData[];
}

// 9. Stories Ocultos
export interface HideStoryFromData {
  relationships_hide_stories_from?: UserData[];
  hide_story_from?: UserData[];
}

// 10. Hashtags Seguidas
export interface FollowingHashtagsData {
  following_hashtags?: Array<{
    string_list_data?: Array<{
      value: string;
      timestamp: number;
    }>;
  }>;
  relationships_following_hashtags?: UserData[];
}

// 11. Perfis Restritos
export interface RestrictedData {
  relationships_restricted_users?: UserData[];
  restricted_profiles?: UserData[];
}

// 12. Sugestões Removidas
export interface RemovedSuggestionsData {
  removed_suggestions?: UserData[];
  relationships_removed_suggestions?: UserData[];
}

// Tipo unificado para todos os dados do Instagram
export interface InstagramDataComplete {
  followers: InstagramUser[];
  following: InstagramUser[];
  closeFriends: InstagramUser[];
  blockedProfiles: InstagramUser[];
  recentlyUnfollowed: InstagramUser[];
  followRequestsReceived: InstagramUser[];
  pendingFollowRequests: InstagramUser[];
  recentFollowRequests: InstagramUser[];
  hideStoryFrom: InstagramUser[];
  followingHashtags: string[];
  restrictedProfiles: InstagramUser[];
  removedSuggestions: InstagramUser[];
}

// Análise completa com todas as categorias
export interface CompleteAnalysis {
  // Dados básicos
  basicData: InstagramDataComplete;

  // Estatísticas gerais
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    mutualCount: number;
    notFollowingBackCount: number;
    notFollowedBackCount: number;
    engagementRatio: number;
    closeFriendsCount: number;
    blockedCount: number;
    restrictedCount: number;
    hideStoryCount: number;
  };

  // Categorias de relacionamento
  relationships: {
    // Básicas (já existentes)
    mutual: InstagramUser[];
    notFollowingBack: InstagramUser[];
    notFollowedBack: InstagramUser[];

    // Novas categorias revolucionárias
    vips: InstagramUser[]; // Mútuos + Close Friends
    redFlags: InstagramUser[]; // Close Friends que não te seguem
    fans: InstagramUser[]; // Te seguem mas você não segue
    crushes: InstagramUser[]; // Você segue mas não te seguem
    ghosts: InstagramUser[]; // Unfollows recentes
    stalkers: InstagramUser[]; // Solicitações pendentes/recusadas
    suspicious: InstagramUser[]; // Possíveis bloqueios (histórico)
  };

  // Score de Saúde Social
  socialHealth: {
    overallScore: number; // 0-100
    reciprocityScore: number;
    privacyScore: number;
    engagementScore: number;
    qualityScore: number;
    recommendations: string[];
    alerts: Alert[];
  };

  // Insights e tendências
  insights: {
    growthRate: number;
    unfollowRate: number;
    newFollowersCount: number;
    lostFollowersCount: number;
    topInteractions: InstagramUser[];
    riskProfiles: InstagramUser[];
  };

  // Metadados
  metadata: {
    analyzedAt: string;
    version: string;
    filesProcessed: string[];
  };
}

// Sistema de Alertas
export interface Alert {
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  category: string;
  priority: number;
}

// Histórico para comparações
export interface HistoricalAnalysis {
  id: string;
  analysis: CompleteAnalysis;
  timestamp: string;
  label?: string;
}

// Comparação entre análises
export interface AnalysisComparison {
  previousAnalysis: HistoricalAnalysis;
  currentAnalysis: HistoricalAnalysis;
  changes: {
    newFollowers: InstagramUser[];
    lostFollowers: InstagramUser[];
    possibleBlocks: InstagramUser[];
    newMutuals: InstagramUser[];
    lostMutuals: InstagramUser[];
    newCloseFriends: InstagramUser[];
    removedCloseFriends: InstagramUser[];
    newBlocks: InstagramUser[];
    newRestrictions: InstagramUser[];
  };
  timeline: TimelineEvent[];
}

// Eventos para timeline
export interface TimelineEvent {
  type:
    | 'follow'
    | 'unfollow'
    | 'block'
    | 'unblock'
    | 'restrict'
    | 'unrestrict'
    | 'close_friend_add'
    | 'close_friend_remove';
  user: InstagramUser;
  timestamp: string;
  description: string;
}

// Tipos para o upload de arquivos
export interface UploadedFileData {
  fileName: string;
  fileType: keyof InstagramDataComplete;
  data: any;
  size: number;
  processedAt: string;
}
