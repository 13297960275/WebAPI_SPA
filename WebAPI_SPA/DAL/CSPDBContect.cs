using WebAPI_SPA.Models.System;

namespace WebAPI_SPA.DAL
{
    using Models;
    using Models.System;
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class CSPDBContect : DbContext
    {
        //您的上下文已配置为从您的应用程序的配置文件(App.config 或 Web.config)
        //使用“CSPDBContect”连接字符串。默认情况下，此连接字符串针对您的 LocalDb 实例上的
        //“WebAPI_SPA.DAL.CSPDBContect”数据库。
        // 
        //如果您想要针对其他数据库和/或数据库提供程序，请在应用程序配置文件中修改“CSPDBContect”
        //连接字符串。
        public CSPDBContect()
            : base("name=CSPDBContect")
        {
        }

        //为您要在模型中包含的每种实体类型都添加 DbSet。有关配置和使用 Code First  模型
        //的详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkId=390109。

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
        public virtual DbSet<User> Users { set; get; }
        public virtual DbSet<UserRefRole> UserRefRoles { set; get; }
        public virtual DbSet<Role> Roles { set; get; }
        public virtual DbSet<RoleI18N> RoleI18Ns { set; get; }
        public virtual DbSet<RoleRefPermission> RoleRefPermissions { set; get; }
        public virtual DbSet<Currency> Currencys { set; get; }
        public virtual DbSet<Function> Functions { set; get; }
        public virtual DbSet<FunctionI18N> FunctionI18Ns { set; get; }
        public virtual DbSet<Keystore> Keystores { set; get; }
        public virtual DbSet<KeystoreSyncJob> KeystoreSyncJobs { set; get; }
        public virtual DbSet<KeystoreSyncStatus> KeystoreSyncStatuss { set; get; }
        public virtual DbSet<Language> Languages { set; get; }
        public virtual DbSet<Region> Regions { set; get; }
        public virtual DbSet<Template> Templates { set; get; }
        public virtual DbSet<TemplateI18N> TemplateI18Ns { set; get; }
        public virtual DbSet<AzureRateCard> AzureRateCards { set; get; }
        public virtual DbSet<Billing> Billings { set; get; }
        public virtual DbSet<BillingDetail> BillingDetails { set; get; }
        public virtual DbSet<BillingSummary> BillingSummarys { set; get; }
        public virtual DbSet<Budget> Budgets { set; get; }
        public virtual DbSet<BudgetNotificationSetting> BudgetNotificationSettings { set; get; }
        public virtual DbSet<Customer> Customers { set; get; }
        public virtual DbSet<Discount> Discounts { set; get; }
        public virtual DbSet<Subscription> Subscriptions { set; get; }
        public virtual DbSet<UsageDetail> UsageDetails { set; get; }
        public virtual DbSet<UsageSummary> UsageSummarys { set; get; }


    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}